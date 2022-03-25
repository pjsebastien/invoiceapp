//Libraries
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
    AppStackNavigator,
    AuthenticatorStackNavigator,
    StartupStackNavigator,
} from './Navigators';
import { useSelector } from 'react-redux';

function AppNavigator() {
    const didTrialAutoLogin = useSelector(state => state.authenticator.didTrialAutoLogin);
    const isAuth = !!useSelector(state => state.authenticator.userId);
    return (
        <NavigationContainer>
            {didTrialAutoLogin && !isAuth && <AuthenticatorStackNavigator />}
            {didTrialAutoLogin && isAuth && <AppStackNavigator />}
            {!didTrialAutoLogin && <StartupStackNavigator />}
        </NavigationContainer>
    );
}

export default AppNavigator;
