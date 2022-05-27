import { TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import buttonsStyles from '../../styles/general/buttonsStyles';
import appTheme from '../../theme/fonts';
import Colors from '../../theme/colors';

const CalendarButtonComponent = ({ onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={buttonsStyles.ButtonTop}
            onPress={onPress}
        >
            <FontAwesome
                name="calendar"
                size={appTheme.Size.size20}
                color={Colors.backgroundSecondary}
            />
        </TouchableOpacity>
    );
};

export default CalendarButtonComponent;
