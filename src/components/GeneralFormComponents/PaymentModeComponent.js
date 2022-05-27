import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import formsStyles from '../../styles/general/formsStyles';
import SearchButtonComponent from '../ButtonsComponents/SearchButtonComponent';
import { useNavigation } from '@react-navigation/native';
import DeleteButtonComponent from '../ButtonsComponents/DeleteButtonComponent';
import appTheme from '../../theme/fonts';
import Colors from '../../theme/colors';

const PaymentModeComponent = ({ data, onDeletePress, setPaymentData }) => {
    const navigation = useNavigation();
    return (
        <View>
            <Text style={formsStyles.formLabelText}>Mode de paiement :</Text>
            {data !== undefined ? (
                <TouchableOpacity
                    onPress={() => navigation.push('payments')}
                    activeOpacity={0.8}
                    style={formsStyles.selectPaymentContainer}
                >
                    <Text style={formsStyles.selectCustomerText}>{data}</Text>

                    <DeleteButtonComponent
                        onPress={onDeletePress}
                        size={appTheme.Size.size32}
                        color={Colors.third}
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() =>
                        navigation.push('payments', { fromSelectCustomer: true })
                    }
                    activeOpacity={0.8}
                    style={formsStyles.selectPaymentContainer}
                >
                    <Text style={formsStyles.selectCustomerText}>
                        Ajouter un mode de paiement
                    </Text>
                    <SearchButtonComponent />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default PaymentModeComponent;
