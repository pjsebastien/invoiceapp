import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import customerCard from '../../styles/customers/customerCard';
import { Ionicons, Feather, AntDesign, Entypo } from '@expo/vector-icons';
import appTheme from '../../theme/fonts';
import Colors from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import * as productInfoActions from '../../store/actions/productInfo';
import { useDispatch, useSelector } from 'react-redux';

const ProductCard = ({ data }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.authenticator.userId);

    const onDeleteButtonHandler = productId => {
        Alert.alert(`Etes vous sur ?`, `Suppression du produit ${data.name}.`, [
            {
                text: 'Supprimer',
                onPress: () => {
                    dispatch(productInfoActions.deleteProduct(userId, data.id));
                    dispatch(productInfoActions.getProducts(userId));
                    navigation.navigate('drawerProducts');
                },
                style: 'default',
            },
            {
                text: 'Annuler',
                style: 'cancel',
            },
        ]);
    };

    return (
        <View style={customerCard.cardContainer}>
            <View style={customerCard.cardTop}>
                <Text style={customerCard.customerNameText}>{data.name}</Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                        navigation.navigate('productInfoForm', {
                            productDataToUpdate: data,
                        })
                    }
                >
                    <Feather
                        name="edit"
                        size={appTheme.Size.size18}
                        color={Colors.primaryDarker}
                    />
                </TouchableOpacity>
            </View>

            <Text style={customerCard.customerTypeText}>{data.productType}</Text>
            <View style={customerCard.productsDetailsCard}>
                <Text style={customerCard.customerSentText}>
                    <Entypo name="text" size={12} color={Colors.third} />
                    {data.description}
                </Text>
            </View>
            <View style={customerCard.cardBottom}>
                <Text style={customerCard.customerSentText}>
                    <Ionicons name="pricetag" size={12} color={Colors.third} />:{' '}
                    {data.isTaxesFree
                        ? data.priceWithTaxesTvaFree + ' €'
                        : data.priceWithoutTaxes + ' € ( HT )'}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onDeleteButtonHandler(data.id)}
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
