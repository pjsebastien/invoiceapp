import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import generalStyles from '../styles/general/generalStyles';
import FormTopButtonsComponent from '../components/ButtonsComponents/FormTopButtonsComponent';

const PreviewModelInvoice = ({ route }) => {
    const [invoiceData, setInvoiceData] = useState();

    useEffect(() => {
        if (typeof route?.params?.data !== 'undefined') {
            setInvoiceData(route?.params.data);
        }
    }, [route?.params?.data]);
    console.log(invoiceData);
    return (
        <View style={generalStyles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={generalStyles.container}>
                    <FormTopButtonsComponent
                    // onPressCheck={handleSubmit(onSubmit)}
                    // onPressArrowBack={() => onPressArrowBack()}
                    />
                </SafeAreaView>
                <Text>{invoiceData?.paymentData}</Text>
                <Text>{invoiceData?.date}</Text>
                <Text>{invoiceData?.expirationDate}</Text>
                <Text>{invoiceData?.attachmentImage}</Text>
                <Text>{invoiceData?.customerData?.customerType}</Text>
                <Text>{invoiceData?.subTotal}</Text>
                <Text>{invoiceData?.fixDiscount}</Text>
                <Text>{invoiceData?.percentDiscount}</Text>
                <Text>{invoiceData?.shipping}</Text>
                <Text>{invoiceData?.termsAndConditionsData}</Text>
                <Text>{invoiceData?.totalAmount}</Text>
                <Text>{invoiceData?.tva}</Text>
            </ScrollView>
        </View>
    );
};

export default PreviewModelInvoice;
