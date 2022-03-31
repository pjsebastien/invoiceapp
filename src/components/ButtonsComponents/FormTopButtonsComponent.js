import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import buttonsStyles from '../../styles/general/buttonsStyles';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';

const FormTopButtonsComponent = ({ onPressCheck }) => {
    return (
        <View style={buttonsStyles.topContainerButtons}>
            <TouchableOpacity activeOpacity={0.8} style={buttonsStyles.ButtonTop}>
                <Ionicons
                    name="ios-arrow-back-sharp"
                    size={appTheme.Size.size20}
                    color={Colors.backgroundSecondary}
                />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={buttonsStyles.ButtonTop}>
                <AntDesign
                    name="check"
                    size={appTheme.Size.size20}
                    color={Colors.backgroundSecondary}
                    onPress={onPressCheck}
                />
            </TouchableOpacity>
        </View>
    );
};

export default FormTopButtonsComponent;
