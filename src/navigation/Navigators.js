import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/Home';
import TestScreen from '../screens/Test';
import AccountScreen from '../screens/Account';
import UserInfoFormScreen from '../screens/forms/UserInfoForm';
import CustomerInfoFormScreen from '../screens/forms/CustomerInfoForm';
import CreateInvoiceFormScreen from '../screens/forms/CreateInvoiceForm';
import CreateEstimationFormScreen from '../screens/forms/CreateEstimationForm';
import ProductsInfoScreen from '../screens/forms/ProductInfoForm';
import ResetPasswordScreen from '../screens/ResetPassword';
import AuthenticatorScreen from '../screens/Authenticator';
import StartupScreen from '../screens/Startup';
import CustomersScreen from '../screens/Customers';
import InvoicesScreen from '../screens/Invoices';
import EstimationsScreen from '../screens/Estimations';
import ProductsScreen from '../screens/Products';

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
            <StackNavigator.Screen
                name="customerInfoForm"
                component={CustomerInfoFormScreen}
                options={{ headerShown: false }}
            />
            <StackNavigator.Screen
                name="productInfoForm"
                component={ProductsInfoScreen}
                options={{ headerShown: false }}
            />
            <StackNavigator.Screen
                name="createInvoiceForm"
                component={CreateInvoiceFormScreen}
                options={{ headerShown: false }}
            />
            <StackNavigator.Screen
                name="createEstimationForm"
                component={CreateEstimationFormScreen}
                options={{ headerShown: false }}
            />
            <StackNavigator.Screen
                name="customers"
                component={CustomersScreen}
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
            <DrawerNavigator.Screen
                name="drawerCustomers"
                component={CustomersScreen}
                options={{
                    // headerShown: true,
                    title: 'Clients',
                }}
            />
            <DrawerNavigator.Screen
                name="drawerEstimations"
                component={EstimationsScreen}
                options={{
                    // headerShown: true,
                    title: 'Devis',
                }}
            />
            <DrawerNavigator.Screen
                name="drawerInvoices"
                component={InvoicesScreen}
                options={{
                    // headerShown: true,
                    title: 'Factures',
                }}
            />
            <DrawerNavigator.Screen
                name="drawerProducts"
                component={ProductsScreen}
                options={{
                    // headerShown: true,
                    title: 'Produits',
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
