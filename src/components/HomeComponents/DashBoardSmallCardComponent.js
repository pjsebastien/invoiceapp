import { Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import homeDashboardStyles from '../../styles/home/homeDashboardStyles';
import Colors from '../../theme/colors';

const DashBoardSmallCardComponent = ({ title, number, status }) => {
    return (
        <TouchableOpacity activeOpacity={0.75} style={homeDashboardStyles.smallCard}>
            <View>
                <Text style={homeDashboardStyles.titleCard}>{title}</Text>
            </View>
            <View>
                <Text style={homeDashboardStyles.contentCardNumber}>{number}</Text>
                <Text style={homeDashboardStyles.contentCardText}>{status}</Text>
            </View>
            <View style={homeDashboardStyles.eyeIconContainer}>
                <View></View>
                <MaterialCommunityIcons
                    style={homeDashboardStyles.eyeIcon}
                    name="eye-circle"
                    size={30}
                    color={Colors.primaryDarker}
                />
            </View>
        </TouchableOpacity>
    );
};

export default DashBoardSmallCardComponent;
