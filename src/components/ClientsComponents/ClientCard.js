import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import clientCard from '../../styles/clients/clientCard';
import { FontAwesome, Foundation, Feather } from '@expo/vector-icons';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';
import { useNavigation } from '@react-navigation/native';

const ClientCard = () => {
    const navigation = useNavigation();
    return (
        <View style={clientCard.cardContainer}>
            <View style={clientCard.cardTop}>
                <Text style={clientCard.clientNameText}>Société Lessur</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('clientInfoForm')}
                >
                    <Feather
                        name="edit"
                        size={appTheme.Size.size16}
                        color={Colors.primaryDarker}
                    />
                </TouchableOpacity>
            </View>
            <Text style={clientCard.clientSentText}>Devis en cours : 1 </Text>
            <Text style={clientCard.clientSentText}>Facture en cours : 2 </Text>
            <Text style={clientCard.clientSentText}>
                <FontAwesome name="phone-square" size={12} color={Colors.third} /> :
                0693214485{' '}
            </Text>
            <Text style={clientCard.clientSentText}>
                <Foundation name="mail" size={12} color={Colors.third} /> :
                pj.sebastien@gmail.com{' '}
            </Text>
        </View>
    );
};

export default ClientCard;
