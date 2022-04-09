import { TouchableOpacity } from 'react-native';
import React from 'react';
import buttonsStyles from '../../styles/general/buttonsStyles';
import { Feather } from '@expo/vector-icons';
import appTheme from '../../theme/fonts';
import Colors from '../../theme/colors';

const RefreshButtonComponent = ({ onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={buttonsStyles.ButtonTop}
            onPress={onPress}
        >
            <Feather
                name="refresh-ccw"
                size={appTheme.Size.size20}
                color={Colors.backgroundSecondary}
            />
        </TouchableOpacity>
    );
};

export default RefreshButtonComponent;
