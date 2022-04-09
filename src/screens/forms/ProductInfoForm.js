import { View, Text, ScrollView, SafeAreaView, TextInput } from 'react-native';
import React, { useState } from 'react';
import SaveButtonComponent from '../../components/ButtonsComponents/SaveButtonComponent';
import generalStyles from '../../styles/general/generalStyles';
import formsStyles from '../../styles/general/formsStyles';
import Colors from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import FormTopButtonsComponent from '../../components/ButtonsComponents/FormTopButtonsComponent';
import Checkbox from 'expo-checkbox';
import { Controller, useForm } from 'react-hook-form';

const ProductInfoForm = () => {
    const [onFocusInput, setOnFocusInput] = useState(null);
    const [isSelected, setSelection] = useState(true);
    const [dataToUpdate, setDataToUpdate] = useState(null);

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const userId = useSelector(state => state.authenticator.userId);
    const token = useSelector(state => state.authenticator.token);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    return (
        <View style={generalStyles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={generalStyles.container}>
                    <FormTopButtonsComponent
                    // onPressCheck={handleSubmit(onSubmit)}
                    // onPressArrowBack={() => onPressArrowBack()}
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
                    <SaveButtonComponent />
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default ProductInfoForm;
