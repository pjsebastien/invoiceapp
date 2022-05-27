import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import appTheme from '../../theme/fonts';
import Colors from '../../theme/colors';
import buttonsStyles from '../../styles/general/buttonsStyles';

const AttachmentButtonComponent = ({ onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={buttonsStyles.ButtonTop}>
            <Entypo
                name="attachment"
                size={appTheme.Size.size20}
                color={Colors.backgroundSecondary}
                onPress={onPress}
            />
        </TouchableOpacity>
    );
};

export default AttachmentButtonComponent;
