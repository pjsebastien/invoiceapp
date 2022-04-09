import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import customerCard from '../../styles/customers/customerCard';
import { Ionicons, Feather, AntDesign, Entypo } from '@expo/vector-icons';
import appTheme from '../../theme/fonts';
import Colors from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';

const ProductCard = () => {
    const navigation = useNavigation();
    return (
        <View style={customerCard.cardContainer}>
            <View style={customerCard.cardTop}>
                <Text style={customerCard.customerNameText}>
                    Site internet sur mesure
                </Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('productInfoForm')}
                >
                    <Feather
                        name="edit"
                        size={appTheme.Size.size18}
                        color={Colors.primaryDarker}
                    />
                </TouchableOpacity>
            </View>

            <Text style={customerCard.customerTypeText}>Prestation de service</Text>
            <View style={customerCard.productsDetailsCard}>
                <Text style={customerCard.customerSentText}>
                    <Entypo name="text" size={12} color={Colors.third} /> : 1 journée de
                    présence en entreprise avec collaboration entre employés et{' '}
                </Text>
            </View>
            <View style={customerCard.cardBottom}>
                <Text style={customerCard.customerSentText}>
                    <Ionicons name="pricetag" size={12} color={Colors.third} />: 15,00 €
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    // onPress={() => onDeleteButtonHandler(data.id)}
                >
                    <AntDesign
                        name="closecircleo"
                        size={appTheme.Size.size18}
                        color={Colors.third}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProductCard;
