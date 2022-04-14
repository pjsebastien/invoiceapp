import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';

const DeleteButtonComponent = ({ onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <AntDesign
                name="closecircleo"
                size={appTheme.Size.size32}
                color={Colors.third}
            />
        </TouchableOpacity>
    );
};

export default DeleteButtonComponent;
