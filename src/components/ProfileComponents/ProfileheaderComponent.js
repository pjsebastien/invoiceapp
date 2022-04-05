import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import accountStyles from '../../styles/account/accountStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import AddPictureComponent from '../GeneralComponents/AddPictureComponent';

const ProfileheaderComponent = ({ logo }) => {
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
                <AddPictureComponent
                    onPress={() => navigation.navigate('userInfoForm')}
                />
            </TouchableOpacity>
        </View>
    );
};

export default ProfileheaderComponent;
