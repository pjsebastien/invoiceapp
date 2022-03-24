import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import appTheme from '../../theme/fonts';
import Colors from '../../theme/colors';
import buttonsStyles from '../../styles/general/buttonsStyles';

const ActionButtonComponent = ({ title }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={buttonsStyles.actionButtonContainer}
        >
            <Text style={buttonsStyles.actionText}>{title}</Text>
            <Ionicons
                style={buttonsStyles.actionAddIcon}
                name="md-add-circle"
                size={appTheme.Size.size24}
                color={Colors.primaryDarker}
            />
        </TouchableOpacity>
    );
};

export default ActionButtonComponent;

const styles = StyleSheet.create({});
