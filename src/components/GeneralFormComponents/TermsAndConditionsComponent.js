import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import formsStyles from '../../styles/general/formsStyles';
import SearchButtonComponent from '../ButtonsComponents/SearchButtonComponent';
import { useNavigation } from '@react-navigation/native';
import DeleteButtonComponent from '../ButtonsComponents/DeleteButtonComponent';
import appTheme from '../../theme/fonts';
import Colors from '../../theme/colors';

const TermsAndConditionsComponent = ({ data, onDeletePress }) => {
    const navigation = useNavigation();
    return (
        <View>
            <Text style={formsStyles.formLabelText}>Conditions générales :</Text>
            {data !== undefined ? (
                <TouchableOpacity
                    onPress={() =>
                        navigation.push('termsAndConditions', {
                            fromSelectCustomer: true,
                        })
                    }
                    activeOpacity={0.8}
                    style={formsStyles.selectProductContainer}
                >
                    <Text style={formsStyles.selectTermsText}>{data}</Text>

                    <DeleteButtonComponent
                        onPress={onDeletePress}
                        size={appTheme.Size.size32}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() =>
                        navigation.push('termsAndConditions', {
                            fromSelectCustomer: true,
                        })
                    }
                    activeOpacity={0.8}
                    style={formsStyles.selectProductContainer}
                >
                    <Text style={formsStyles.selectProductText}>
                        Selectionner les conditions générales
                    </Text>
                    <SearchButtonComponent />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default TermsAndConditionsComponent;
