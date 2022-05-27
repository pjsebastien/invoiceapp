import {
    View,
    TextInput,
    SafeAreaView,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import generalStyles from '../styles/general/generalStyles';
import DrawerMenuButtonComponent from '../components/ButtonsComponents/DrawerMenuButtonComponent';
import buttonsStyles from '../styles/general/buttonsStyles';
import SearchButtonComponent from '../components/ButtonsComponents/SearchButtonComponent';
import AddButtonComponent from '../components/ButtonsComponents/AddButtonComponent';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ProductCard from '../components/ProductsComponents/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import * as productInfoActions from '../store/actions/productInfo';
import RefreshButtonComponent from '../components/ButtonsComponents/RefreshButtonComponent';

const Products = ({ route }) => {
    const [searchActive, setSearchActive] = useState(false);
    const [query, setQuery] = useState('');
    const [searchedData, setSearchedData] = useState([]);
    const [isFromSelectProduct, setSelectedProduct] = useState(false);
    const [selectionProduct, setSelectionProduct] = useState([]);

    const dispatch = useDispatch();
    const userId = useSelector(state => state.authenticator.userId);
    const fetchedProducts = useSelector(state => state.app.products);
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(productInfoActions.getProducts(userId));
    }, []);

    useFocusEffect(
        useCallback(() => {
            route?.params?.fromSelectProduct
                ? (setSelectedProduct(true), console.log(route.params))
                : console.log('no params');

            return () => {
                setSelectedProduct(false);
            };
        }, []),
    );

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
                {isFromSelectProduct ? (
                    <View
                        style={{ ...generalStyles.flexRowJustifyBetween, marginTop: 30 }}
                    >
                        <Text style={generalStyles.classicTextStyle}>
                            {selectionProduct.length}
                            {selectionProduct.length > 1
                                ? ' produits sélectionnés'
                                : ' produit sélectionné'}{' '}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={buttonsStyles.buttonOk}
                            onPress={() =>
                                selectionProduct.length > 0
                                    ? navigation.navigate('createInvoiceForm', {
                                          selectedProduct: selectionProduct,
                                      })
                                    : navigation.navigate('createInvoiceForm')
                            }
                        >
                            <Text style={buttonsStyles.buttonOkText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}

                <View style={{ marginTop: 20, flex: 1 }}>
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
                                return (
                                    <ProductCard
                                        data={item}
                                        key={item.id}
                                        isFromSelectProduct={isFromSelectProduct}
                                        setSelectionProduct={setSelectionProduct}
                                        selectionProduct={selectionProduct}
                                    />
                                );
                            }}
                        />
                    ) : (
                        <View style={generalStyles.noDataContainer}>
                            <Text style={generalStyles.noDataText}>Aucun Produit.</Text>
                        </View>
                    )}
                </View>
            </SafeAreaView>
            <AddButtonComponent
                onPress={() =>
                    navigation.navigate('productInfoForm', {
                        isFromSelectProduct: isFromSelectProduct,
                    })
                }
            />
        </View>
    );
};

export default Products;
