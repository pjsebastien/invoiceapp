import { View, Text, TouchableOpacity } from 'react-native';
import homeDashboardStyles from '../../styles/home/homeDashboardStyles';

const DashboardInvoiceCardComponents = ({ title, number, status, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={homeDashboardStyles.card}
            onPress={onPress}
        >
            <View>
                <Text style={homeDashboardStyles.titleCard}>{title}</Text>
            </View>
            <View>
                <Text style={homeDashboardStyles.contentCardNumber}>{number}</Text>
                <Text style={homeDashboardStyles.contentCardText}>{status}</Text>
            </View>

            <View style={homeDashboardStyles.bottomCard}>
                <Text style={homeDashboardStyles.textBottomCard}>Voir les factures</Text>
            </View>
        </TouchableOpacity>
    );
};

export default DashboardInvoiceCardComponents;
