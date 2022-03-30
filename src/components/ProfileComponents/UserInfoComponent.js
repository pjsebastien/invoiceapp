import { View, Text } from 'react-native';
import React from 'react';
import accountStyles from '../../styles/account/accountStyles';
import { Feather } from '@expo/vector-icons';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';

const UserInfoComponent = () => {
    return (
        <View
            style={{
                ...accountStyles.infoContainer,
                backgroundColor: Colors.backgroundSecondary,
            }}
        >
            <View>
                <Text style={accountStyles.titleInfo}>Informations de l'utilisateur</Text>
                <View style={accountStyles.infoTextContainer}>
                    <Text style={accountStyles.labelInfo}>Adresse : </Text>
                    <Text style={accountStyles.textInfo}>
                        83 rue du foutr à chaux, appartement F 97410 Saint Pierre
                    </Text>
                </View>
                <View style={accountStyles.infoTextContainer}>
                    <Text style={accountStyles.labelInfo}>Nom : </Text>
                    <Text style={accountStyles.textInfo}>Margouill'app</Text>
                </View>
                <View style={accountStyles.infoTextContainer}>
                    <Text style={accountStyles.labelInfo}>Téléphone : </Text>
                    <Text style={accountStyles.textInfo}>0693 21 44 85</Text>
                </View>
                <View style={accountStyles.infoTextContainer}>
                    <Text style={accountStyles.labelInfo}>Mail : </Text>
                    <Text style={accountStyles.textInfo}>pj.sebastien@gmail.com</Text>
                </View>
            </View>
            <View>
                <Feather
                    name="edit"
                    size={appTheme.Size.size16}
                    color={Colors.primaryDarker}
                />
            </View>
        </View>
    );
};

export default UserInfoComponent;
