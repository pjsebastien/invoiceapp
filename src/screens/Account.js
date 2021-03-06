import { View, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import generalStyles from '../styles/general/generalStyles';
import ProfileheaderComponent from '../components/ProfileComponents/ProfileheaderComponent';
import CompanyInfoComponent from '../components/ProfileComponents/CompanyInfoComponent';
import UserInfoComponent from '../components/ProfileComponents/UserInfoComponent';
import DrawerMenuButtonComponent from '../components/ButtonsComponents/DrawerMenuButtonComponent';
import DisconnectButtonComponent from '../components/ButtonsComponents/DisconnectButtonComponent';
import buttonsStyles from '../styles/general/buttonsStyles';

const Account = () => {
    return (
        <View style={generalStyles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={generalStyles.container}>
                    <View style={buttonsStyles.topButtons}>
                        <DrawerMenuButtonComponent />
                        <DisconnectButtonComponent />
                    </View>
                    <ProfileheaderComponent />
                    <CompanyInfoComponent />
                    <UserInfoComponent />
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default Account;
