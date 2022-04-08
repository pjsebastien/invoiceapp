import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import DrawerMenuButtonComponent from '../ButtonsComponents/DrawerMenuButtonComponent';
import ProfileButtonComponent from '../ButtonsComponents/ProfileButtonComponent';
import buttonsStyles from '../../styles/general/buttonsStyles';

const TopButtonsComponent = () => {
    return (
        <View style={buttonsStyles.topButtons}>
            <DrawerMenuButtonComponent />
            <ProfileButtonComponent />
        </View>
    );
};

export default TopButtonsComponent;

const styles = StyleSheet.create({});
