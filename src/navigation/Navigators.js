import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/Home';
import TestScreen from '../screens/Test';

//AppStackNavigator
const StackNavigator = createStackNavigator();

export const AppStackNavigator = () => {
    return (
        <StackNavigator.Navigator mode="modal">
            {/* <StackNavigator.Screen
                name="authenticator"
                component={TestScreen}
                options={{ headerShown: false }}
            /> */}
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
        </DrawerNavigator.Navigator>
    );
};
