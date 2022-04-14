import { View, Text, TouchableOpacity, Pressable, Modal } from 'react-native';
import React, { useState } from 'react';
import formsStyles from '../../styles/general/formsStyles';
import SearchButtonComponent from '../ButtonsComponents/SearchButtonComponent';
import generalStyles from '../../styles/general/generalStyles';
import buttonsStyles from '../../styles/general/buttonsStyles';
import { useNavigation } from '@react-navigation/native';
import DeleteButtonComponent from '../ButtonsComponents/DeleteButtonComponent';

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

                    <DeleteButtonComponent onPress={onDeletePress} />
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
