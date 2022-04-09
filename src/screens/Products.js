import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import React from 'react';
import generalStyles from '../styles/general/generalStyles';
import DrawerMenuButtonComponent from '../components/ButtonsComponents/DrawerMenuButtonComponent';
import buttonsStyles from '../styles/general/buttonsStyles';
import SearchButtonComponent from '../components/ButtonsComponents/SearchButtonComponent';
import AddButtonComponent from '../components/ButtonsComponents/AddButtonComponent';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../components/ProductsComponents/ProductCard';

const Products = () => {
    const navigation = useNavigation();
    return (
        <View style={generalStyles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={generalStyles.container}>
                    <View style={buttonsStyles.topButtons}>
                        <DrawerMenuButtonComponent />
                        <Text style={generalStyles.titleScreenText}>Mes produits</Text>
                        <SearchButtonComponent />
                    </View>
                    <View style={generalStyles.container}>
                        <ProductCard />
                    </View>
                </SafeAreaView>
            </ScrollView>
            <AddButtonComponent onPress={() => navigation.navigate('productInfoForm')} />
        </View>
    );
};

export default Products;
