import { View, SafeAreaView } from 'react-native';
import React from 'react';
import generalStyles from '../styles/general/generalStyles';
import TopButtonsComponent from '../components/HomeComponents/TopButtonsComponent';
import TopHelloText from '../components/HomeComponents/TopHelloText';
import ActionsButtonComponent from '../components/HomeComponents/ActionsButtonComponent';
import DashboardHomeComponent from '../components/HomeComponents/DashboardHomeComponent';

const Home = () => {
    return (
        <View style={generalStyles.mainContainer}>
            <SafeAreaView style={generalStyles.container}>
                <TopButtonsComponent />
                <TopHelloText />
                <ActionsButtonComponent />
                <DashboardHomeComponent />
            </SafeAreaView>
        </View>
    );
};

export default Home;
