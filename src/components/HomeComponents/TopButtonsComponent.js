import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import homeStyles from '../../styles/home/homeStyles';

import DrawerMenuButtonComponent from '../ButtonsComponents/DrawerMenuButtonComponent';
import ProfileButtonComponent from '../ButtonsComponents/ProfileButtonComponent';

const TopButtonsComponent = () => {
    return (
        <View style={homeStyles.topButtons}>
            <DrawerMenuButtonComponent />
            <ProfileButtonComponent />
        </View>
    );
};

export default TopButtonsComponent;

const styles = StyleSheet.create({});
