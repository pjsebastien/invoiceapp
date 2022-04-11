import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Alert,
    BackHandler,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import SaveButtonComponent from '../../components/ButtonsComponents/SaveButtonComponent';
import generalStyles from '../../styles/general/generalStyles';
import formsStyles from '../../styles/general/formsStyles';
import Colors from '../../theme/colors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as productInfoActions from '../../store/actions/productInfo';
import FormTopButtonsComponent from '../../components/ButtonsComponents/FormTopButtonsComponent';
import Checkbox from 'expo-checkbox';
import { Controller, useForm } from 'react-hook-form';

const ProductInfoForm = ({ route }) => {
    const [onFocusInput, setOnFocusInput] = useState(null);
    const [isSelected, setSelection] = useState(true);
    const [isTaxesFree, setIsTaxesFree] = useState(false);
    const [dataToUpdate, setDataToUpdate] = useState(null);

    const [priceTtc, setPriceTtc] = useState(null);

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const userId = useSelector(state => state.authenticator.userId);
    const token = useSelector(state => state.authenticator.token);

    useEffect(() => {
        preventBackButtonHandling();
    }, []);

    useFocusEffect(
        useCallback(() => {
            return () => {
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    onPressArrowBackBottom,
                );
            };
        }, []),
    );
    const onPressArrowBack = () => {
        Alert.alert('Quitter sans sauvegarder ?', '', [
            {
                text: 'Sauvegarder',
                onPress: handleSubmit(onSubmit),
                style: 'default',
            },
            {
                text: 'Annuler',
                onPress: preventBackButtonHandling,
                style: 'default',
            },
            {
                text: 'OK',
                onPress: () => navigation.goBack(),
                style: 'default',
            },
        ]);

        return true;
    };
    const onPressArrowBackBottom = () => {
        Alert.alert('Quitter sans sauvegarder ?', '', [
            {
                text: 'Annuler',
                onPress: preventBackButtonHandling,
                style: 'default',
            },
            {
                text: 'OK',
                onPress: () => navigation.goBack(),
                style: 'default',
            },
        ]);

        return true;
    };

    const preventBackButtonHandling = () => {
        BackHandler.addEventListener('hardwareBackPress', onPressArrowBackBottom);
        return true;
    };

    useEffect(async () => {
        route?.params && setDataToUpdate(route?.params.productDataToUpdate);
        if (dataToUpdate) {
            if (dataToUpdate.productType === 'Article') {
                setSelection(true);
            } else {
                setSelection(false);
            }
            if (await dataToUpdate.isTaxesFree) {
                setIsTaxesFree(true);
                setValue('priceWithTaxesTvaFree', dataToUpdate.priceWithTaxesTvaFree);
            } else {
                setIsTaxesFree(false);
                setPriceTtc(dataToUpdate.priceTtc);
                setValue('priceWithoutTaxes', dataToUpdate.priceWithoutTaxes);
                setValue('tva', dataToUpdate.tva);
            }

            setValue('description', dataToUpdate.description);
            setValue('information', dataToUpdate.information);
            setValue('name', dataToUpdate.name);
            setValue('unit', dataToUpdate.unit);
        }
    }, [dataToUpdate]);

    const ttcPriceCalculator = () => {
        const priceWithoutTaxes = getValues('priceWithoutTaxes');
        const tva = getValues('tva');
        console.log(tva);
        if (priceWithoutTaxes !== undefined && tva !== undefined) {
            setPriceTtc(
                Number(priceWithoutTaxes) +
                    Number(priceWithoutTaxes) * (Number(tva) / 100),
            );
        }
    };

    const onSubmit = data => {
        const productInfo = {
            productType: isSelected ? 'Article' : 'Prestation',
            name: data.name ? data.name : '',
            description: data.description ? data.description : '',
            isTaxesFree: isTaxesFree,
            priceWithTaxesTvaFree: data.priceWithTaxesTvaFree
                ? data.priceWithTaxesTvaFree
                : '',
            priceWithoutTaxes: data.priceWithoutTaxes ? data.priceWithoutTaxes : '',
            tva: data.tva ? data.tva : '',
            priceTtc: priceTtc ? priceTtc : '',
            unit: data.unit ? data.unit : '',
            information: data.information ? data.information : '',
        };

        if (dataToUpdate) {
            dispatch(
                productInfoActions.putProductInfo(userId, productInfo, dataToUpdate.id),
                Alert.alert('Merci,', 'Vos changements on étés pris en compte !'),
            );
        } else {
            dispatch(productInfoActions.addProductInfo(userId, productInfo));
            Alert.alert('Merci,', 'Vos produit a été créé avec succès !');
        }
        dispatch(productInfoActions.getProducts(userId));

        navigation.navigate('drawerProducts');
    };

    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();
    return (
        <View style={generalStyles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={generalStyles.container}>
                    <FormTopButtonsComponent
                        onPressCheck={handleSubmit(onSubmit)}
                        onPressArrowBack={() => onPressArrowBack()}
                    />
                    <View style={formsStyles.headerFormTitleContainer}>
                        <Text style={formsStyles.headerFormTitle}>
                            {dataToUpdate ? 'Modifier' : 'Nouveau'}{' '}
                        </Text>
                        <Text
                            style={{
                                ...formsStyles.headerFormTitle,
                                color: Colors.primary,
                            }}
                        >
                            Produit
                        </Text>
                    </View>
                    <View style={formsStyles.checkBoxesContainer}>
                        <View style={formsStyles.checkBoxContainer}>
                            <Checkbox
                                value={isSelected}
                                onValueChange={() => setSelection(!isSelected)}
                                style={formsStyles.checkBox}
                            />
                            <Text style={formsStyles.checkBoxLabel}>Article</Text>
                        </View>
                        <View style={formsStyles.checkBoxContainer}>
                            <Checkbox
                                value={!isSelected}
                                onValueChange={() => setSelection(!isSelected)}
                                style={formsStyles.checkBox}
                            />
                            <Text style={formsStyles.checkBoxLabel}>Prestation</Text>
                        </View>
                    </View>
                    <View style={formsStyles.formContainer}>
                        <View>
                            <Text style={formsStyles.formLabelText}>Nom :</Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'name'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('name')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder={'Nom du produit'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="name"
                            />
                            <Text style={formsStyles.formLabelText}>
                                Description du produit :
                            </Text>

                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'description'
                                                ? formsStyles.formBorderCustomerBottomFocused
                                                : formsStyles.formInputCustomer
                                        }
                                        onFocus={() => setOnFocusInput('description')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder={'Ecrivez ici...'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                        numberOfLines={5}
                                    />
                                )}
                                name="description"
                            />
                            <View
                                style={{
                                    ...formsStyles.checkBoxContainer,
                                    marginVertical: 10,
                                }}
                            >
                                <Checkbox
                                    value={isTaxesFree}
                                    onValueChange={() => setIsTaxesFree(!isTaxesFree)}
                                    style={formsStyles.checkBox}
                                />
                                <Text style={formsStyles.checkBoxLabel}>
                                    Exonéré de TVA
                                </Text>
                            </View>
                            {isTaxesFree ? (
                                <View>
                                    <Text style={formsStyles.formLabelText}>
                                        Prix TTC :
                                    </Text>
                                    <Controller
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <TextInput
                                                style={
                                                    onFocusInput ===
                                                    'priceWithTaxesTvaFree'
                                                        ? formsStyles.formBorderBottomFocused
                                                        : formsStyles.formInput
                                                }
                                                onFocus={() =>
                                                    setOnFocusInput(
                                                        'priceWithTaxesTvaFree',
                                                    )
                                                }
                                                onBlur={() => setOnFocusInput('')}
                                                placeholder={'Prix TTC du produit'}
                                                value={value}
                                                // value={fetchedData ?ttcprice: value}
                                                onChangeText={value => onChange(value)}
                                                multiline={true}
                                                keyboardType="numeric"
                                            />
                                        )}
                                        name="priceWithTaxesTvaFree"
                                    />
                                </View>
                            ) : (
                                <View>
                                    <Text style={formsStyles.formLabelText}>
                                        Prix HT :
                                    </Text>
                                    <Controller
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <TextInput
                                                style={
                                                    onFocusInput === 'priceWithoutTaxes'
                                                        ? formsStyles.formBorderBottomFocused
                                                        : formsStyles.formInput
                                                }
                                                onFocus={() =>
                                                    setOnFocusInput('priceWithoutTaxes')
                                                }
                                                onBlur={() => {
                                                    setOnFocusInput('');
                                                }}
                                                placeholder={'Prix HT du produit'}
                                                value={value}
                                                onChangeText={value => onChange(value)}
                                                multiline={true}
                                                keyboardType="numeric"
                                            />
                                        )}
                                        name="priceWithoutTaxes"
                                    />
                                    <Text style={formsStyles.formLabelText}>
                                        TVA applicable ( en % ):
                                    </Text>
                                    <Controller
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <TextInput
                                                style={
                                                    onFocusInput === 'tva'
                                                        ? formsStyles.formBorderBottomFocused
                                                        : formsStyles.formInput
                                                }
                                                onFocus={() => setOnFocusInput('tva')}
                                                onBlur={() => {
                                                    setOnFocusInput('');
                                                }}
                                                placeholder={'Tva applicable au produit'}
                                                value={value}
                                                onChangeText={value => onChange(value)}
                                                multiline={true}
                                                keyboardType="numeric"
                                            />
                                        )}
                                        name="tva"
                                    />
                                    <Text style={formsStyles.formLabelText}>
                                        Prix TTC :
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => ttcPriceCalculator()}
                                    >
                                        <Text style={formsStyles.ttcText}>
                                            {priceTtc !== null ? (
                                                priceTtc
                                            ) : (
                                                <Text style={{ color: '#A9A9A9' }}>
                                                    Appuyer pour obtenir
                                                </Text>
                                            )}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            <Text style={formsStyles.formLabelText}>Unité :</Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'unit'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('unit')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder={'ex : heure, pièce, kg, jour ...'}
                                        value={value}
                                        // value={fetchedData ? ttcprice: value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="unit"
                            />
                            <Text style={formsStyles.formLabelText}>
                                Informations supplémentaires :
                            </Text>
                            <Text style={formsStyles.formLabelSmallText}>
                                ( Ne figure pas sur les factures ou devis )
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'information'
                                                ? formsStyles.formBorderCustomerBottomFocused
                                                : formsStyles.formInputCustomer
                                        }
                                        onFocus={() => setOnFocusInput('information')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder={'Ecrivez ici...'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                        numberOfLines={5}
                                    />
                                )}
                                name="information"
                            />
                        </View>
                    </View>
                    <SaveButtonComponent onPress={handleSubmit(onSubmit)} />
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default ProductInfoForm;
