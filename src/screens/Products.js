import { View, TextInput, SafeAreaView, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import generalStyles from '../styles/general/generalStyles';
import DrawerMenuButtonComponent from '../components/ButtonsComponents/DrawerMenuButtonComponent';
import buttonsStyles from '../styles/general/buttonsStyles';
import SearchButtonComponent from '../components/ButtonsComponents/SearchButtonComponent';
import AddButtonComponent from '../components/ButtonsComponents/AddButtonComponent';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../components/ProductsComponents/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import * as productInfoActions from '../store/actions/productInfo';
import RefreshButtonComponent from '../components/ButtonsComponents/RefreshButtonComponent';

const Products = () => {
    const [searchActive, setSearchActive] = useState(false);
    const [query, setQuery] = useState('');
    const [searchedData, setSearchedData] = useState([]);

    const dispatch = useDispatch();
    const userId = useSelector(state => state.authenticator.userId);
    const fetchedProducts = useSelector(state => state.app.products);
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(productInfoActions.getProducts(userId));
    }, []);

    const handleSearchButton = () => {
        setSearchActive(!searchActive);
        setSearchedData(
            query !== ''
                ? fetchedProducts.filter(item =>
                      item.name.toLowerCase().includes(query.toLowerCase()),
                  )
                : [],
        );
        setQuery('');
    };

    return (
        <View style={generalStyles.mainContainer}>
            <SafeAreaView style={generalStyles.container}>
                <View style={buttonsStyles.topButtons}>
                    {searchedData.length > 0 ? (
                        <RefreshButtonComponent onPress={() => setSearchedData([])} />
                    ) : (
                        <DrawerMenuButtonComponent />
                    )}

                    {searchActive ? (
                        <>
                            <TextInput
                                value={query}
                                onChangeText={text => setQuery(text)}
                                placeholder="Entrez votre recherche..."
                                style={generalStyles.searchInput}
                                onSubmitEditing={() => handleSearchButton()}
                            />
                            <SearchButtonComponent onPress={() => handleSearchButton()} />
                        </>
                    ) : (
                        <>
                            <Text style={generalStyles.titleScreenText}>
                                Mes produits
                            </Text>
                            <SearchButtonComponent
                                onPress={() => setSearchActive(!searchActive)}
                            />
                        </>
                    )}
                </View>
                <View style={generalStyles.container}>
                    {fetchedProducts.length >= 1 ? (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={
                                searchedData.length > 0
                                    ? searchedData
                                    : fetchedProducts.filter(
                                          product => product != undefined,
                                      )
                            }
                            renderItem={({ item }) => {
                                return <ProductCard data={item} key={item.id} />;
                            }}
                        />
                    ) : (
                        <View style={generalStyles.noDataContainer}>
                            <Text style={generalStyles.noDataText}>Aucun Produit.</Text>
                        </View>
                    )}
                </View>
            </SafeAreaView>
            <AddButtonComponent onPress={() => navigation.navigate('productInfoForm')} />
        </View>
    );
};

export default Products;
