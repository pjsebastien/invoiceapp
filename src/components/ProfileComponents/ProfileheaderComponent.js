import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import accountStyles from '../../styles/account/accountStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';
import { useNavigation } from '@react-navigation/native';

const ProfileheaderComponent = () => {
    const navigation = useNavigation();
    return (
        <View>
            <TouchableOpacity
                style={accountStyles.headerContainer}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('userInfoForm')}
            >
                <View style={accountStyles.headerRightContainer}>
                    <Text style={accountStyles.headerName}>Ajouter</Text>
                    <Text style={accountStyles.headerCompany}>(Entreprise)</Text>
                </View>
                <View activeOpacity={0.8} style={accountStyles.headerLogoImage}>
                    <MaterialCommunityIcons
                        name="image-plus"
                        size={appTheme.Size.size42}
                        color={Colors.primaryDarker}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileheaderComponent;
