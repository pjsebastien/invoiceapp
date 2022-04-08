import { Alert, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/authenticator';
import buttonsStyles from '../../styles/general/buttonsStyles';
import { Feather } from '@expo/vector-icons';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';

const DisconnectButtonComponent = () => {
    const dispatch = useDispatch();
    const onLogoutPressHandler = () => {
        Alert.alert('Voulez vous vous déconnecter ?', '', [
            {
                text: 'Deconnexion',
                onPress: disconnect,
                style: 'default',
            },
            {
                text: 'Annuler',
                style: 'cancel',
            },
        ]);
    };
    const disconnect = () => {
        dispatch(authActions.logout());
    };
    return (
        <View>
            <TouchableOpacity
                style={buttonsStyles.ButtonTop}
                onPress={onLogoutPressHandler}
            >
                <Feather
                    name="power"
                    size={appTheme.Size.size20}
                    color={Colors.backgroundSecondary}
                />
            </TouchableOpacity>
        </View>
    );
};

export default DisconnectButtonComponent;
