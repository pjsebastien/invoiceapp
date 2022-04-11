import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    TextInput,
    Alert,
    BackHandler,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import generalStyles from '../../styles/general/generalStyles';
import FormTopButtonsComponent from '../../components/ButtonsComponents/FormTopButtonsComponent';
import formsStyles from '../../styles/general/formsStyles';
import Colors from '../../theme/colors';
import Checkbox from 'expo-checkbox';
import { useForm, Controller } from 'react-hook-form';
import SaveButtonComponent from '../../components/ButtonsComponents/SaveButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import * as customerInfoActions from '../../store/actions/customerInfo';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const CustomerInfoForm = ({ props, route }) => {
    const [isSelected, setSelection] = useState(true);
    const [onFocusInput, setOnFocusInput] = useState(null);
    const [dataToUpdate, setDataToUpdate] = useState(null);

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

    useEffect(async () => {
        route?.params && setDataToUpdate(route?.params.customerDataToUpdate);
        if (dataToUpdate) {
            if ((await dataToUpdate.customerType) === 'Particulier') {
                setSelection(true);
                setValue('userName', dataToUpdate.userName);
                setValue('familyName', dataToUpdate.familyName);
            } else {
                setSelection(false);
                setValue('companyName', dataToUpdate.companyName);
                setValue('siret', dataToUpdate.siret);
                setValue('tvaNumber', dataToUpdate.tvaNumber);
            }

            setValue('adressCity', dataToUpdate.adressCity);
            setValue('adressLineTwo', dataToUpdate.adressLineTwo);
            setValue('adressStreet', dataToUpdate.adressStreet);
            setValue('deliveryAdressCity', dataToUpdate.deliveryAdressCity);
            setValue('deliveryAdressLineTwo', dataToUpdate.deliveryAdressLineTwo);
            setValue('deliveryAdressStreet', dataToUpdate.deliveryAdressStreet);
            setValue('mail', dataToUpdate.mail);
            setValue('phone', dataToUpdate.phone);
            setValue('customerDetails', dataToUpdate.customerDetails);
        }
    }, [dataToUpdate]);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = data => {
        const customerInfo = {
            customerType: isSelected ? 'Particulier' : 'Entreprise',
            userName: data.userName ? data.userName : '',
            familyName: data.familyName ? data.familyName : '',
            companyName: data.companyName ? data.companyName : '',
            adressStreet: data.adressStreet ? data.adressStreet : '',
            adressLineTwo: data.adressLineTwo ? data.adressLineTwo : '',
            adressCity: data.adressCity ? data.adressCity : '',
            deliveryAdressStreet: data.deliveryAdressStreet
                ? data.deliveryAdressStreet
                : '',
            deliveryAdressLineTwo: data.deliveryAdressLineTwo
                ? data.deliveryAdressLineTwo
                : '',
            deliveryAdressCity: data.deliveryAdressCity ? data.deliveryAdressCity : '',
            mail: data.mail ? data.mail : '',
            phone: data.phone ? data.phone : '',
            siret: data.siret ? data.siret : '',
            tvaNumber: data.tvaNumber ? data.tvaNumber : '',
            customerDetails: data.customerDetails ? data.customerDetails : '',
        };

        if (dataToUpdate) {
            dispatch(
                customerInfoActions.putCustomerInfo(
                    userId,
                    customerInfo,
                    dataToUpdate.id,
                ),
            );
        } else {
            dispatch(customerInfoActions.addCustomerInfo(userId, customerInfo));
        }

        dispatch(customerInfoActions.getCustomers(userId));

        Alert.alert('Merci,', 'Vos changements on étés pris en compte.');
        navigation.navigate('drawerCustomers');
    };

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
                            Client
                        </Text>
                    </View>
                    <View style={formsStyles.checkBoxesContainer}>
                        <View style={formsStyles.checkBoxContainer}>
                            <Checkbox
                                value={isSelected}
                                onValueChange={() => setSelection(!isSelected)}
                                style={formsStyles.checkBox}
                            />
                            <Text style={formsStyles.checkBoxLabel}>Particulier</Text>
                        </View>
                        <View style={formsStyles.checkBoxContainer}>
                            <Checkbox
                                value={!isSelected}
                                onValueChange={() => setSelection(!isSelected)}
                                style={formsStyles.checkBox}
                            />
                            <Text style={formsStyles.checkBoxLabel}>Entreprise</Text>
                        </View>
                    </View>
                    <View style={formsStyles.formContainer}>
                        {isSelected ? (
                            <View>
                                <Text style={formsStyles.formLabelText}>Prénom :</Text>
                                <Controller
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <TextInput
                                            style={
                                                onFocusInput === 'userName'
                                                    ? formsStyles.formBorderBottomFocused
                                                    : formsStyles.formInput
                                            }
                                            onFocus={() => setOnFocusInput('userName')}
                                            onBlur={() => setOnFocusInput('')}
                                            placeholder={'Prénom'}
                                            value={value}
                                            onChangeText={value => onChange(value)}
                                            multiline={true}
                                        />
                                    )}
                                    name="userName"
                                />
                                <Text style={formsStyles.formLabelText}>Nom :</Text>
                                <Controller
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <TextInput
                                            style={
                                                onFocusInput === 'familyName'
                                                    ? formsStyles.formBorderBottomFocused
                                                    : formsStyles.formInput
                                            }
                                            onFocus={() => setOnFocusInput('familyName')}
                                            onBlur={() => setOnFocusInput('')}
                                            placeholder={'Nom de famille'}
                                            value={value}
                                            onChangeText={value => onChange(value)}
                                            multiline={true}
                                        />
                                    )}
                                    name="familyName"
                                />
                            </View>
                        ) : (
                            <View>
                                <Text style={formsStyles.formLabelText}>
                                    Nom de l'entreprise :
                                </Text>
                                <Controller
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <TextInput
                                            style={
                                                onFocusInput === 'companyName'
                                                    ? formsStyles.formBorderBottomFocused
                                                    : formsStyles.formInput
                                            }
                                            onFocus={() => setOnFocusInput('companyName')}
                                            onBlur={() => setOnFocusInput('')}
                                            placeholder={'Prénom'}
                                            value={value}
                                            onChangeText={value => onChange(value)}
                                            multiline={true}
                                        />
                                    )}
                                    name="companyName"
                                />
                                <Text style={formsStyles.formLabelText}>
                                    Numéro SIRET :
                                </Text>
                                <Controller
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <TextInput
                                            style={
                                                onFocusInput === 'siret'
                                                    ? formsStyles.formBorderBottomFocused
                                                    : formsStyles.formInput
                                            }
                                            onFocus={() => setOnFocusInput('siret')}
                                            onBlur={() => setOnFocusInput('')}
                                            placeholder={'Numéro SIRET'}
                                            value={value}
                                            onChangeText={value => onChange(value)}
                                            multiline={true}
                                        />
                                    )}
                                    name="siret"
                                />
                                <Text style={formsStyles.formLabelText}>
                                    Numéro TVA :
                                </Text>
                                <Controller
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <TextInput
                                            style={
                                                onFocusInput === 'tvaNumber'
                                                    ? formsStyles.formBorderBottomFocused
                                                    : formsStyles.formInput
                                            }
                                            onFocus={() => setOnFocusInput('tvaNumber')}
                                            onBlur={() => setOnFocusInput('')}
                                            placeholder={'Numéro de TVA'}
                                            value={value}
                                            onChangeText={value => onChange(value)}
                                            multiline={true}
                                        />
                                    )}
                                    name="tvaNumber"
                                />
                            </View>
                        )}
                        <Text style={formsStyles.formLabelText}>Mail :</Text>
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    style={
                                        onFocusInput === 'mail'
                                            ? formsStyles.formBorderBottomFocused
                                            : formsStyles.formInput
                                    }
                                    onFocus={() => setOnFocusInput('mail')}
                                    onBlur={() => setOnFocusInput('')}
                                    placeholder={'Adresse mail'}
                                    value={value}
                                    onChangeText={value => onChange(value)}
                                    multiline={true}
                                    keyboardType="email-address"
                                />
                            )}
                            name="mail"
                        />
                        <Text style={formsStyles.formLabelText}>Téléphone :</Text>
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    style={
                                        onFocusInput === 'phone'
                                            ? formsStyles.formBorderBottomFocused
                                            : formsStyles.formInput
                                    }
                                    onFocus={() => setOnFocusInput('phone')}
                                    onBlur={() => setOnFocusInput('')}
                                    placeholder={'Numéro de téléphone'}
                                    value={value}
                                    onChangeText={value => onChange(value)}
                                    multiline={true}
                                    keyboardType="numeric"
                                />
                            )}
                            name="phone"
                        />
                        <Text style={formsStyles.formLabelText}>
                            Adresse de facturation :
                        </Text>
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    style={
                                        onFocusInput === 'adressStreet'
                                            ? formsStyles.formBorderBottomFocused
                                            : formsStyles.formInput
                                    }
                                    onFocus={() => setOnFocusInput('adressStreet')}
                                    onBlur={() => setOnFocusInput('')}
                                    placeholder="Adresse ligne 1."
                                    value={value}
                                    onChangeText={value => onChange(value)}
                                    multiline={true}
                                />
                            )}
                            name="adressStreet"
                        />
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    style={
                                        onFocusInput === 'adressLineTwo'
                                            ? formsStyles.formBorderBottomFocused
                                            : formsStyles.formInput
                                    }
                                    onFocus={() => setOnFocusInput('adressLineTwo')}
                                    onBlur={() => setOnFocusInput('')}
                                    placeholder="Adresse ligne 2."
                                    value={value}
                                    onChangeText={value => onChange(value)}
                                    multiline={true}
                                />
                            )}
                            name="adressLineTwo"
                        />
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    style={
                                        onFocusInput === 'adressCity'
                                            ? formsStyles.formBorderBottomFocused
                                            : formsStyles.formInput
                                    }
                                    onFocus={() => setOnFocusInput('adressCity')}
                                    onBlur={() => setOnFocusInput('')}
                                    placeholder="Code postal et nom de ville."
                                    value={value}
                                    onChangeText={value => onChange(value)}
                                    multiline={true}
                                />
                            )}
                            name="adressCity"
                        />
                        <Text style={formsStyles.formLabelText}>
                            Adresse de livraison :
                        </Text>
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    style={
                                        onFocusInput === 'deliveryAdressStreet'
                                            ? formsStyles.formBorderBottomFocused
                                            : formsStyles.formInput
                                    }
                                    onFocus={() =>
                                        setOnFocusInput('deliveryAdressStreet')
                                    }
                                    onBlur={() => setOnFocusInput('')}
                                    placeholder="Adresse ligne 1."
                                    value={value}
                                    onChangeText={value => onChange(value)}
                                    multiline={true}
                                />
                            )}
                            name="deliveryAdressStreet"
                        />
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    style={
                                        onFocusInput === 'deliveryAdressLineTwo'
                                            ? formsStyles.formBorderBottomFocused
                                            : formsStyles.formInput
                                    }
                                    onFocus={() =>
                                        setOnFocusInput('deliveryAdressLineTwo')
                                    }
                                    onBlur={() => setOnFocusInput('')}
                                    placeholder="Adresse ligne 2."
                                    value={value}
                                    onChangeText={value => onChange(value)}
                                    multiline={true}
                                />
                            )}
                            name="deliveryAdressLineTwo"
                        />
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    style={
                                        onFocusInput === 'deliveryAdressCity'
                                            ? formsStyles.formBorderBottomFocused
                                            : formsStyles.formInput
                                    }
                                    onFocus={() => setOnFocusInput('deliveryAdressCity')}
                                    onBlur={() => setOnFocusInput('')}
                                    placeholder="Code postal et nom de ville."
                                    value={value}
                                    onChangeText={value => onChange(value)}
                                    multiline={true}
                                />
                            )}
                            name="deliveryAdressCity"
                        />
                        <Text style={formsStyles.formLabelText}>
                            Détails du customer :
                        </Text>
                        <Text style={formsStyles.formLabelSmallText}>
                            ( Ne figure pas sur les factures ou devis )
                        </Text>
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    style={
                                        onFocusInput === 'customerDetails'
                                            ? formsStyles.formBorderCustomerBottomFocused
                                            : formsStyles.formInputCustomer
                                    }
                                    onFocus={() => setOnFocusInput('customerDetails')}
                                    onBlur={() => setOnFocusInput('')}
                                    placeholder={'Ecrivez ici...'}
                                    value={value}
                                    onChangeText={value => onChange(value)}
                                    multiline={true}
                                    numberOfLines={5}
                                />
                            )}
                            name="customerDetails"
                        />
                    </View>
                    <SaveButtonComponent onPress={handleSubmit(onSubmit)} />
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default CustomerInfoForm;
