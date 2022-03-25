import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import generalStyles from '../styles/general/generalStyles';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/authenticator';

const Test = () => {
    const dispatch = useDispatch();
    const onLogoutPressHandler = () => {
        dispatch(authActions.logout());
    };
    return (
        <View style={generalStyles.container}>
            <TouchableOpacity
                style={{
                    margintop: 150,
                    backgroundColor: 'yellow',
                    width: 100,
                    height: 50,
                }}
                onPress={onLogoutPressHandler}
            >
                <Text>Deconnexion</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Test;

const styles = StyleSheet.create({});
