import { TouchableOpacity } from 'react-native';
import React from 'react';
import buttonsStyles from '../../styles/general/buttonsStyles';
import appTheme from '../../theme/fonts';
import Colors from '../../theme/colors';
import { Entypo } from '@expo/vector-icons';

const ViewButtonComponent = ({ onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={buttonsStyles.ButtonTop}>
            <Entypo
                name="eye"
                size={appTheme.Size.size20}
                color={Colors.backgroundSecondary}
                onPress={onPress}
            />
        </TouchableOpacity>
    );
};

export default ViewButtonComponent;
