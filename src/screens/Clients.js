import { View, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import generalStyles from '../styles/general/generalStyles';
import DrawerMenuButtonComponent from '../components/ButtonsComponents/DrawerMenuButtonComponent';
import buttonsStyles from '../styles/general/buttonsStyles';
import SearchButtonComponent from '../components/ButtonsComponents/SearchButtonComponent';
import ClientCard from '../components/ClientsComponents/ClientCard';
import AddButtonComponent from '../components/ButtonsComponents/AddButtonComponent';
import { useNavigation } from '@react-navigation/native';

const Clients = () => {
    const navigation = useNavigation();
    return (
        <View style={generalStyles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={generalStyles.container}>
                    <View style={buttonsStyles.topButtons}>
                        <DrawerMenuButtonComponent />
                        <SearchButtonComponent />
                    </View>
                    <View style={generalStyles.container}>
                        <ClientCard />
                        <ClientCard />
                        <ClientCard />
                        <ClientCard />
                        <ClientCard />
                        <ClientCard />
                        <ClientCard />
                    </View>
                </SafeAreaView>
            </ScrollView>
            <AddButtonComponent onPress={() => navigation.navigate('clientInfoForm')} />
        </View>
    );
};

export default Clients;
