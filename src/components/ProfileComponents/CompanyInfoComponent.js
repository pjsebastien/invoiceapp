import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import accountStyles from '../../styles/account/accountStyles';
import { Feather } from '@expo/vector-icons';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { useGetUserInfo } from '../../hooks/UserInfoHooks';

const CompanyInfoComponent = () => {
    const navigation = useNavigation();
    const fetchedUserInfo = useGetUserInfo();

    return (
        <View>
            <TouchableOpacity
                style={{
                    ...accountStyles.infoContainer,
                    backgroundColor: Colors.backgroundSecondary,
                }}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('userInfoForm')}
            >
                <View>
                    <Text style={accountStyles.titleInfo}>
                        Informations de l'entreprise
                    </Text>
                    <View style={accountStyles.infoTextContainer}>
                        <Text style={accountStyles.labelInfo}>Adresse : </Text>

                        <Text style={accountStyles.textInfo}>
                            {fetchedUserInfo.adressStreet}
                        </Text>
                        <Text style={accountStyles.textInfo}>
                            {fetchedUserInfo.adressLineTwo}
                        </Text>
                        <Text style={accountStyles.textInfo}>
                            {fetchedUserInfo.adressCity}
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
            </TouchableOpacity>
        </View>
    );
};

export default CompanyInfoComponent;
