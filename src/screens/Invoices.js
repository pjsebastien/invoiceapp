import { View, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import generalStyles from '../styles/general/generalStyles';
import DrawerMenuButtonComponent from '../components/ButtonsComponents/DrawerMenuButtonComponent';
import buttonsStyles from '../styles/general/buttonsStyles';
import SearchButtonComponent from '../components/ButtonsComponents/SearchButtonComponent';
import AddButtonComponent from '../components/ButtonsComponents/AddButtonComponent';
import { useNavigation } from '@react-navigation/native';

const Invoices = () => {
    const navigation = useNavigation();
    return (
        <View style={generalStyles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={generalStyles.container}>
                    <View style={buttonsStyles.topButtons}>
                        <DrawerMenuButtonComponent />
                        <SearchButtonComponent />
                    </View>
                </SafeAreaView>
            </ScrollView>
            <AddButtonComponent
                onPress={() => navigation.navigate('createInvoiceForm')}
            />
        </View>
    );
};

export default Invoices;
