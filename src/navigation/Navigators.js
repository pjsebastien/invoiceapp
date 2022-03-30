import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/Home';
import TestScreen from '../screens/Test';
import AccountScreen from '../screens/Account';
import UserInfoFormScreen from '../screens/UserInfoForm';
import ResetPasswordScreen from '../screens/ResetPassword';
import AuthenticatorScreen from '../screens/Authenticator';
import StartupScreen from '../screens/Startup';

//AppStackNavigator
const StackNavigator = createStackNavigator();

export const AppStackNavigator = () => {
    return (
        <StackNavigator.Navigator mode="modal">
            <StackNavigator.Screen
                name="app"
                component={AppDrawerNavigator}
                options={{ headerShown: false }}
            />

            <StackNavigator.Screen
                name="test"
                component={TestScreen}
                options={{ headerShown: false }}
            />
            <StackNavigator.Screen
                name="userInfoForm"
                component={UserInfoFormScreen}
                options={{ headerShown: false }}
            />
        </StackNavigator.Navigator>
    );
};

const DrawerNavigator = createDrawerNavigator();

const AppDrawerNavigator = () => {
    return (
        <DrawerNavigator.Navigator mode="modal">
            <DrawerNavigator.Screen
                name="drawerHome"
                component={HomeScreen}
                options={{
                    // headerShown: true,
                    title: 'Accueil',
                }}
            />
            <DrawerNavigator.Screen
                name="drawerTest"
                component={TestScreen}
                options={{
                    // headerShown: true,
                    title: 'Test',
                }}
            />
            <DrawerNavigator.Screen
                name="drawerAccount"
                component={AccountScreen}
                options={{
                    // headerShown: true,
                    title: 'Mon compte',
                }}
            />
        </DrawerNavigator.Navigator>
    );
};

const AuthenticatorNavigator = createStackNavigator();

export const AuthenticatorStackNavigator = () => {
    return (
        <AuthenticatorNavigator.Navigator mode="modal">
            <AuthenticatorNavigator.Screen
                name="authenticator"
                component={AuthenticatorScreen}
                options={{ headerShown: false }}
            />
            <AuthenticatorNavigator.Screen
                name="resetPassword"
                component={ResetPasswordScreen}
                options={{ headerShown: false }}
            />
        </AuthenticatorNavigator.Navigator>
    );
};

const StartupNavigator = createStackNavigator();

export const StartupStackNavigator = () => {
    return (
        <StartupNavigator.Navigator mode="modal">
            <StartupNavigator.Screen
                name="startup"
                component={StartupScreen}
                options={{ headerShown: false }}
            />
        </StartupNavigator.Navigator>
    );
};
