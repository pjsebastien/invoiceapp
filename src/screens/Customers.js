import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import generalStyles from '../styles/general/generalStyles';
import DrawerMenuButtonComponent from '../components/ButtonsComponents/DrawerMenuButtonComponent';
import buttonsStyles from '../styles/general/buttonsStyles';
import SearchButtonComponent from '../components/ButtonsComponents/SearchButtonComponent';
import CustomerCard from '../components/CustomersComponents/CustomerCard';
import AddButtonComponent from '../components/ButtonsComponents/AddButtonComponent';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as customerInfoActions from '../store/actions/customerInfo';
import RefreshButtonComponent from '../components/ButtonsComponents/RefreshButtonComponent';
import BackButtonComponent from '../components/ButtonsComponents/BackButtonComponent';

const Customers = ({ route }) => {
    const [searchActive, setSearchActive] = useState(false);
    const [query, setQuery] = useState('');
    const [searchedData, setSearchedData] = useState([]);
    const [isFromSelectCustomer, setSelectedCustomer] = useState(false);

    const dispatch = useDispatch();
    const userId = useSelector(state => state.authenticator.userId);
    const fetchedCustomers = useSelector(state => state.app.customers);
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(customerInfoActions.getCustomers(userId));
        route?.params?.fromSelectCustomer
            ? setSelectedCustomer(true)
            : console.log('no params');
    }, []);
    useFocusEffect(
        useCallback(() => {
            route?.params?.fromSelectCustomer
                ? setSelectedCustomer(true)
                : console.log('no params');
            return () => {
                setSelectedCustomer(false);
            };
        }, []),
    );

    const handleSearchButton = () => {
        setSearchActive(!searchActive);
        setSearchedData(
            query !== ''
                ? fetchedCustomers.filter(
                      item =>
                          item.companyName.toLowerCase().includes(query.toLowerCase()) ||
                          item.familyName.toLowerCase().includes(query.toLowerCase()) ||
                          item.userName.toLowerCase().includes(query.toLowerCase()),
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
                    ) : isFromSelectCustomer ? (
                        <BackButtonComponent onPress={() => navigation.goBack()} />
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
                            <Text style={generalStyles.titleScreenText}>Mes clients</Text>
                            <SearchButtonComponent
                                onPress={() => setSearchActive(!searchActive)}
                            />
                        </>
                    )}
                </View>
                <TouchableOpacity
                    style={{ marginTop: 20 }}
                    onPress={() => console.log(isFromSelectCustomer)}
                >
                    <Text>xxxxx</Text>
                </TouchableOpacity>
                <View style={generalStyles.container}>
                    {fetchedCustomers.length >= 1 ? (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={
                                searchedData.length > 0
                                    ? searchedData
                                    : fetchedCustomers.filter(
                                          customer => customer != undefined,
                                      )
                            }
                            renderItem={({ item }) => {
                                return (
                                    <CustomerCard
                                        data={item}
                                        key={item.id}
                                        isFromSelectCustomer={isFromSelectCustomer}
                                    />
                                );
                            }}
                        />
                    ) : (
                        <View style={generalStyles.noDataContainer}>
                            <Text style={generalStyles.noDataText}>Aucun client.</Text>
                        </View>
                    )}
                </View>
            </SafeAreaView>
            <AddButtonComponent
                onPress={() =>
                    navigation.navigate('customerInfoForm', {
                        isFromSelectCustomer: isFromSelectCustomer,
                    })
                }
            />
        </View>
    );
};

export default Customers;
