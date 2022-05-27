import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import Colors from '../../theme/colors';

const DeleteButtonComponent = ({ onPress, size, color }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <AntDesign name="closecircleo" size={size} color={color} />
        </TouchableOpacity>
    );
};

export default DeleteButtonComponent;
