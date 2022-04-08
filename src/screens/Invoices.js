import { View, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import generalStyles from '../styles/general/generalStyles';
import DrawerMenuButtonComponent from '../components/ButtonsComponents/DrawerMenuButtonComponent';
import buttonsStyles from '../styles/general/buttonsStyles';
import SearchButtonComponent from '../components/ButtonsComponents/SearchButtonComponent';

const Invoices = () => {
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
        </View>
    );
};

export default Invoices;
