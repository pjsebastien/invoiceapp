import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import customerCard from '../../styles/customers/customerCard';
import { FontAwesome, Foundation, Feather, AntDesign, Entypo } from '@expo/vector-icons';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as customerInfoActions from '../../store/actions/customerInfo';

const CustomerCard = ({ data, isFromSelectCustomer }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.authenticator.userId);

    const onDeleteButtonHandler = customerId => {
        Alert.alert(
            `Etes vous sur ?`,
            `Suppression du client ${
                data.customerType === 'Entreprise'
                    ? data.companyName
                    : data.familyName + ' ' + data.userName
            }.`,
            [
                {
                    text: 'Supprimer',
                    onPress: () => {
                        dispatch(customerInfoActions.deleteCustomer(userId, data.id));
                        dispatch(customerInfoActions.getCustomers(userId));
                        navigation.navigate('drawerCustomers');
                    },
                    style: 'default',
                },
                {
                    text: 'Annuler',
                    style: 'cancel',
                },
            ],
        );
    };
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={
                isFromSelectCustomer === false
                    ? null
                    : () =>
                          navigation.navigate('createInvoiceForm', {
                              selectedCustomer: data,
                          })
            }
        >
            <View style={customerCard.cardContainer}>
                <View style={customerCard.cardTop}>
                    <Text style={customerCard.customerNameText}>
                        {data.customerType === 'Entreprise'
                            ? data.companyName
                            : data.familyName + ' ' + data.userName}
                    </Text>
                    {isFromSelectCustomer === false ? (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                                navigation.navigate('customerInfoForm', {
                                    customerDataToUpdate: data,
                                })
                            }
                        >
                            <Feather
                                name="edit"
                                size={appTheme.Size.size18}
                                color={Colors.primaryDarker}
                            />
                        </TouchableOpacity>
                    ) : (
                        <Entypo
                            name="check"
                            size={appTheme.Size.size18}
                            color={Colors.primaryDarker}
                        />
                    )}
                </View>

                <Text style={customerCard.customerTypeText}>{data.customerType}</Text>
                <Text style={customerCard.customerSentText}>Devis en cours : 1 </Text>
                <Text style={customerCard.customerSentText}>Facture en cours : 2 </Text>
                <Text style={customerCard.customerSentText}>
                    <FontAwesome name="phone-square" size={12} color={Colors.third} /> :
                    {data.phone}
                </Text>
                <View style={customerCard.cardBottom}>
                    <Text style={customerCard.customerSentText}>
                        <Foundation name="mail" size={12} color={Colors.third} /> :
                        {data.mail}
                    </Text>
                    {isFromSelectCustomer === false ? (
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
                    ) : null}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CustomerCard;
