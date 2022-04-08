import { View, Text, ScrollView, SafeAreaView, TextInput } from 'react-native';
import React, { useState } from 'react';
import generalStyles from '../../styles/general/generalStyles';
import FormTopButtonsComponent from '../../components/ButtonsComponents/FormTopButtonsComponent';
import formsStyles from '../../styles/general/formsStyles';
import Colors from '../../theme/colors';
import Checkbox from 'expo-checkbox';
import { useForm, Controller } from 'react-hook-form';

const ClientInfoForm = () => {
    const [isSelected, setSelection] = useState(true);
    const [onFocusInput, setOnFocusInput] = useState(null);
    console.log(isSelected);

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
                    <FormTopButtonsComponent />
                    <View style={formsStyles.headerFormTitleContainer}>
                        <Text style={formsStyles.headerFormTitle}>Nouveau </Text>
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
                        <Text style={formsStyles.formLabelText}>Détails du client :</Text>
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
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default ClientInfoForm;
