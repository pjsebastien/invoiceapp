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
                    backgroundColor: Colors.backgroundColor,
                }}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('userInfoForm')}
            >
                <View>
                    <Text style={accountStyles.titleInfo}>Coordonnées :</Text>
                    <View style={accountStyles.infoTextContainer}>
                        <Text style={accountStyles.labelInfo}>Nom de l'entreprise :</Text>
                        <Text style={accountStyles.textInfo}>
                            {fetchedUserInfo.companyName}
                        </Text>
                    </View>
                    <View style={accountStyles.infoTextContainer}>
                        <Text style={accountStyles.labelInfo}>Gérant :</Text>
                        <Text style={accountStyles.textInfo}>
                            {fetchedUserInfo.userName} {fetchedUserInfo.familyName}
                        </Text>
                    </View>
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
                        <Text style={accountStyles.labelInfo}>Téléphone mobile : </Text>
                        <Text style={accountStyles.textInfo}>
                            {fetchedUserInfo.mobilePhone}
                        </Text>
                    </View>
                    <View style={accountStyles.infoTextContainer}>
                        <Text style={accountStyles.labelInfo}>Téléphone fix : </Text>
                        <Text style={accountStyles.textInfo}>
                            {fetchedUserInfo.fixPhone}
                        </Text>
                    </View>
                    <View style={accountStyles.infoTextContainer}>
                        <Text style={accountStyles.labelInfo}>Mail : </Text>
                        <Text style={accountStyles.textInfo}>{fetchedUserInfo.mail}</Text>
                    </View>
                    <View style={accountStyles.infoTextContainer}>
                        <Text style={accountStyles.labelInfo}>Site internet : </Text>
                        <Text style={accountStyles.textInfo}>
                            {fetchedUserInfo.webSite}
                        </Text>
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
