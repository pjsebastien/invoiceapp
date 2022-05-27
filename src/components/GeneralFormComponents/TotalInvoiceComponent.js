import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import formsStyles from '../../styles/general/formsStyles';
import ActionButtonComponent from '../ButtonsComponents/ActionButtonComponent';
import DiscountInvoiceComponent from '../ModalsComponents.js/DiscountInvoiceComponent';
import TvaInvoiceComponent from '../ModalsComponents.js/TvaInvoiceComponent';
import ShippingInvoiceComponent from '../ModalsComponents.js/ShippingInvoiceComponent';

const TotalInvoiceComponent = ({
    data,
    subTotal,
    setFixDiscount,
    setPercentDiscount,
    setTva,
    setShipping,
    totalAmount,
}) => {
    const [modalDiscountVisible, setModalDiscountVisible] = useState(false);
    const [modalTvaVisible, setModalTvaVisible] = useState(false);
    const [modalShippingVisible, setModalShippingVisible] = useState(false);
    return (
        <View>
            <DiscountInvoiceComponent
                modalVisible={modalDiscountVisible}
                setModalVisible={setModalDiscountVisible}
                setFixDiscount={setFixDiscount}
                setPercentDiscount={setPercentDiscount}
            />
            <TvaInvoiceComponent
                modalVisible={modalTvaVisible}
                setTva={setTva}
                setModalVisible={setModalTvaVisible}
            />
            <ShippingInvoiceComponent
                modalVisible={modalShippingVisible}
                setShipping={setShipping}
                setModalVisible={setModalShippingVisible}
            />
            <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                <View style={formsStyles.subTotalContainer}>
                    <Text style={formsStyles.formLabelTextTotal}>
                        Sous total (H.T) :{' '}
                    </Text>
                    <Text style={formsStyles.formLabelTextTotal}>{subTotal} €</Text>
                </View>

                <View style={{ ...formsStyles.subTotalContainer, marginVertical: 15 }}>
                    <ActionButtonComponent
                        title={'Remise'}
                        onPress={() => setModalDiscountVisible(!modalDiscountVisible)}
                        sizeText={{ fontSize: 14 }}
                    />
                    <ActionButtonComponent
                        title={`TVA ( Si applicable) `}
                        onPress={() => setModalTvaVisible(!modalTvaVisible)}
                        sizeText={{ fontSize: 14 }}
                    />
                </View>
                <View style={{ ...formsStyles.subTotalContainer, marginVertical: 15 }}>
                    <ActionButtonComponent
                        title={`Frais de transport `}
                        onPress={() => setModalShippingVisible(!modalShippingVisible)}
                        sizeText={{ fontSize: 14 }}
                    />
                </View>
            </View>
            <View style={formsStyles.subTotalContainer}>
                <Text style={formsStyles.formLabelTextTotal}>Montant total : </Text>
                <Text style={formsStyles.totalAmount}>{totalAmount} €</Text>
            </View>
        </View>
    );
};

export default TotalInvoiceComponent;
