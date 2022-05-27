import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';
import { useDispatch, useSelector } from 'react-redux';
import * as paymentModeActions from '../../store/actions/invoiceDetails';

import paymentModeCard from '../../styles/paymentMode/paymentModeCard';

const PaymentModeCard = ({ data }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const userId = useSelector(state => state.authenticator.userId);

    const onDeleteButtonHandler = paymentModeId => {
        Alert.alert(`Etes vous sur ?`, `Suppression du produit ${data.name}.`, [
            {
                text: 'Supprimer',
                onPress: () => {
                    dispatch(paymentModeActions.deletePaymentMode(userId, data.id));
                    dispatch(paymentModeActions.getPaymentMode(userId));
                },
                style: 'default',
            },
            {
                text: 'Annuler',
                style: 'cancel',
            },
        ]);
    };
    return (
        <View style={paymentModeCard.cardContainer}>
            <TouchableOpacity
                style={paymentModeCard.paymentNameContainer}
                activeOpacity={1}
                onPress={() =>
                    navigation.navigate('createInvoiceForm', { paymentMode: data })
                }
            >
                <Text style={paymentModeCard.paymentNameText}>{data.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onDeleteButtonHandler(data.id)}
            >
                <AntDesign
                    name="closecircleo"
                    size={appTheme.Size.size18}
                    color={Colors.third}
                />
            </TouchableOpacity>
        </View>
    );
};

export default PaymentModeCard;
