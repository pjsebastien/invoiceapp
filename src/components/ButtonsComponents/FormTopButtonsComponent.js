import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import buttonsStyles from '../../styles/general/buttonsStyles';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';
import BackButtonComponent from './BackButtonComponent';

const FormTopButtonsComponent = ({ onPressCheck, onPressArrowBack }) => {
    return (
        <View style={buttonsStyles.topContainerButtons}>
            <BackButtonComponent onPress={onPressArrowBack} />
            <TouchableOpacity
                activeOpacity={0.8}
                style={buttonsStyles.ButtonTop}
                onPress={onPressCheck}
            >
                <AntDesign
                    name="check"
                    size={appTheme.Size.size20}
                    color={Colors.backgroundSecondary}
                />
            </TouchableOpacity>
        </View>
    );
};

export default FormTopButtonsComponent;
