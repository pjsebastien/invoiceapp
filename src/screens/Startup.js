import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authActions from '../store/actions/authenticator';
import { useDispatch } from 'react-redux';
import Colors from '../theme/colors';

const Startup = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                dispatch(authActions.setDidTrial());
                return;
            }
            const transformData = JSON.parse(userData);
            const { token, refreshToken } = transformData;

            if (!token || !refreshToken) {
                dispatch(authActions.setDidTrial());
                return;
            }

            dispatch(authActions.fetchRefreshToken(refreshToken));
        };

        tryLogin();
    }, []);
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.backgroundSecondary,
            }}
        >
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    );
};

export default Startup;
