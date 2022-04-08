import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import buttonsStyles from '../../styles/general/buttonsStyles';
import { Ionicons } from '@expo/vector-icons';
import appTheme from '../../theme/fonts';
import Colors from '../../theme/colors';

const AddButtonComponent = ({ onPress }) => {
    return (
        <View style={buttonsStyles.ButtonAddStatic}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={buttonsStyles.ButtonTop}
                onPress={onPress}
            >
                <Ionicons
                    name="add-outline"
                    size={appTheme.Size.size20}
                    color={Colors.backgroundSecondary}
                />
            </TouchableOpacity>
        </View>
    );
};

export default AddButtonComponent;
