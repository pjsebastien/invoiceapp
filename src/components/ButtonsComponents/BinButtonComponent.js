import { TouchableOpacity } from 'react-native';
import React from 'react';
import buttonsStyles from '../../styles/general/buttonsStyles';
import { Ionicons } from '@expo/vector-icons';
import appTheme from '../../theme/fonts';
import Colors from '../../theme/colors';

const BinButtonComponent = ({ onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={buttonsStyles.ButtonTop}>
            <Ionicons
                name="md-trash-bin"
                size={appTheme.Size.size20}
                color={Colors.backgroundSecondary}
                onPress={onPress}
            />
        </TouchableOpacity>
    );
};

export default BinButtonComponent;
