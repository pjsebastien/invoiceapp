import { View, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import generalStyles from '../styles/general/generalStyles';
import ProfileheaderComponent from '../components/ProfileComponents/ProfileheaderComponent';
import CompanyInfoComponent from '../components/ProfileComponents/CompanyInfoComponent';
import UserInfoComponent from '../components/ProfileComponents/UserInfoComponent';
import DrawerMenuButtonComponent from '../components/ButtonsComponents/DrawerMenuButtonComponent';

const Account = () => {
    return (
        <View style={generalStyles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={generalStyles.container}>
                    <DrawerMenuButtonComponent />
                    <ProfileheaderComponent />
                    <CompanyInfoComponent />
                    <UserInfoComponent />
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default Account;
