import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import accountStyles from '../../styles/account/accountStyles';
import { useNavigation } from '@react-navigation/native';
import AddPictureComponent from '../GeneralComponents/AddPictureComponent';
import { useGetUserInfo } from '../../hooks/UserInfoHooks';

const ProfileheaderComponent = () => {
    const navigation = useNavigation();
    const fetchedUserInfo = useGetUserInfo();
    return (
        <View>
            <TouchableOpacity
                style={accountStyles.headerContainer}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('userInfoForm')}
            >
                <AddPictureComponent
                    onPress={() => navigation.navigate('userInfoForm')}
                />
                <View style={accountStyles.headerTextContainer}>
                    <Text style={accountStyles.headerName}>
                        {fetchedUserInfo.userName ? fetchedUserInfo.userName : 'Ajouter'}
                    </Text>
                    <Text style={accountStyles.headerCompany}>
                        {fetchedUserInfo.companyName
                            ? fetchedUserInfo.companyName
                            : 'Ajouter'}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileheaderComponent;
