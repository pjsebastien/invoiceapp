import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import accountStyles from '../../styles/account/accountStyles';
import buttonsStyles from '../../styles/general/buttonsStyles';

const SaveButtonComponent = ({ onPress }) => {
    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={accountStyles.saveButtonContainer}
            >
                <Text style={buttonsStyles.buttonThirdColor}>Sauvegarder</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SaveButtonComponent;
