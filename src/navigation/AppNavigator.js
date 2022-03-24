//Libraries
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import { AppStackNavigator } from './Navigators';

function AppNavigator() {
    return (
        <NavigationContainer>
            <AppStackNavigator />
        </NavigationContainer>
    );
}

export default AppNavigator;
