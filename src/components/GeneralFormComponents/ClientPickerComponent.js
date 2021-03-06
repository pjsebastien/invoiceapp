import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import formsStyles from '../../styles/general/formsStyles';
import SearchButtonComponent from '../ButtonsComponents/SearchButtonComponent';
import { useNavigation } from '@react-navigation/native';
import DeleteButtonComponent from '../ButtonsComponents/DeleteButtonComponent';
import appTheme from '../../theme/fonts';
import Colors from '../../theme/colors';

const ClientPickerComponent = ({ data, onDeletePress }) => {
    const navigation = useNavigation();
    return (
        <View>
            <Text style={formsStyles.formLabelText}>Choisir un client :</Text>
            {data !== undefined ? (
                <TouchableOpacity
                    onPress={() =>
                        navigation.push('customers', { fromSelectCustomer: true })
                    }
                    activeOpacity={0.8}
                    style={formsStyles.selectCustomerContainer}
                >
                    <View>
                        <Text style={formsStyles.selectCustomerText}>
                            {data.customerType === 'Entreprise'
                                ? data.companyName
                                : data.familyName + ' ' + data.userName}
                        </Text>
                        <Text style={formsStyles.selectCustomerTextSmall}>
                            {data.customerType}
                        </Text>
                    </View>

                    <DeleteButtonComponent
                        onPress={onDeletePress}
                        size={appTheme.Size.size32}
                        color={Colors.third}
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() =>
                        navigation.push('customers', { fromSelectCustomer: true })
                    }
                    activeOpacity={0.8}
                    style={formsStyles.selectCustomerContainer}
                >
                    <Text style={formsStyles.selectCustomerText}>
                        Selectionner un client
                    </Text>
                    <SearchButtonComponent />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ClientPickerComponent;
