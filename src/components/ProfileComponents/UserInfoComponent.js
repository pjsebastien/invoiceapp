import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import accountStyles from '../../styles/account/accountStyles';
import { Feather } from '@expo/vector-icons';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { useGetUserInfo } from '../../hooks/UserInfoHooks';

const UserInfoComponent = () => {
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
                    <Text style={accountStyles.titleInfo}>Détails de l'entreprise :</Text>
                    <View style={accountStyles.infoTextContainer}>
                        <Text style={accountStyles.labelInfo}>Statut juridique : </Text>
                        <Text style={accountStyles.textInfo}>
                            {fetchedUserInfo.statut}
                        </Text>
                    </View>
                    <View style={accountStyles.infoTextContainer}>
                        <Text style={accountStyles.labelInfo}>Numéro SIRET : </Text>
                        <Text style={accountStyles.textInfo}>
                            {fetchedUserInfo.siret}
                        </Text>
                    </View>
                    <View style={accountStyles.infoTextContainer}>
                        <Text style={accountStyles.labelInfo}>Numéro RCS : </Text>
                        <Text style={accountStyles.textInfo}>{fetchedUserInfo.rcs}</Text>
                    </View>
                    <View style={accountStyles.infoTextContainer}>
                        <Text style={accountStyles.labelInfo}>Numéro de TVA : </Text>
                        <Text style={accountStyles.textInfo}>
                            {fetchedUserInfo.tva ? fetchedUserInfo.tva : 'exonéré'}
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
            <TouchableOpacity
                style={{
                    ...accountStyles.infoContainer,
                    backgroundColor: Colors.backgroundColor,
                }}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('userInfoForm')}
            >
                <View>
                    <View style={accountStyles.signTitleContainer}>
                        <Text style={accountStyles.titleInfo}>Signature :</Text>
                        <View style={{ marginRight: appTheme.Size.size36 }}>
                            <Feather
                                name="edit"
                                size={appTheme.Size.size16}
                                color={Colors.primaryDarker}
                            />
                        </View>
                    </View>
                    {fetchedUserInfo.signImage ? (
                        <Image
                            resizeMode={'contain'}
                            style={accountStyles.imageSign64}
                            source={{
                                uri: fetchedUserInfo.signImage,
                            }}
                        />
                    ) : (
                        <View
                            style={{
                                ...accountStyles.imageSign64,
                                ...accountStyles.imageSign64Void,
                            }}
                        >
                            <Text>Cliquez ici pour signer</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default UserInfoComponent;
