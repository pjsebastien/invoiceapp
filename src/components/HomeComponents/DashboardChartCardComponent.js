import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import homeDashboardStyles from '../../styles/home/homeDashboardStyles';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../theme/colors';

const DashboardChartCardComponent = () => {
    return (
        <TouchableOpacity activeOpacity={0.75} style={homeDashboardStyles.card}>
            <View style={{ marginTop: 40, alignItems: 'center' }}>
                <MaterialIcons name="pie-chart" size={100} color={Colors.third} />
            </View>

            <View style={homeDashboardStyles.bottomCard}>
                <Text style={homeDashboardStyles.textBottomCard}>
                    Voir les statistiques
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default DashboardChartCardComponent;
