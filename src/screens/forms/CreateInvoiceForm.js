import { View, Text, SafeAreaView, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import BackButtonComponent from '../../components/ButtonsComponents/BackButtonComponent';
import buttonsStyles from '../../styles/general/buttonsStyles';
import generalStyles from '../../styles/general/generalStyles';
import ViewButtonComponent from '../../components/ButtonsComponents/ViewButtonComponent';
import formsStyles from '../../styles/general/formsStyles';
import ClientPickerComponent from '../../components/GeneralFormComponents/ClientPickerComponent';
import { useForm, Controller } from 'react-hook-form';

const CreateInvoiceForm = ({ route }) => {
    const [onFocusInput, setOnFocusInput] = useState(null);
    const [customerData, setCustomerData] = useState();
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    useEffect(() => {
        if (typeof route?.params?.selectedCustomer !== 'undefined') {
            setCustomerData(route?.params.selectedCustomer);
            console.log(route?.params.selectedCustomer);
        }
    }, [route?.params?.selectedCustomer]);

    return (
        <View style={generalStyles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={generalStyles.container}>
                    <View style={buttonsStyles.topButtons}>
                        <BackButtonComponent />
                        <Text style={generalStyles.titleScreenText}>
                            Nouvelle Facture
                        </Text>
                        <ViewButtonComponent />
                    </View>
                    <View style={formsStyles.formContainer}>
                        <Text style={formsStyles.formLabelText}>Numéro de facture :</Text>
                        <Text>D02022022001</Text>
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
                        <ClientPickerComponent
                            data={customerData}
                            onDeletePress={() => setCustomerData()}
                        />
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default CreateInvoiceForm;
