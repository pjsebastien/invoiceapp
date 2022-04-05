import { TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import accountStyles from '../../styles/account/accountStyles';
import appTheme from '../../theme/fonts';
import Colors from '../../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import * as userInfoActions from '../../store/actions/userInfo';

const AddPictureComponent = ({ onPress }) => {
    const dispatch = useDispatch();
    const fetchedUserInfo = useSelector(state => state.app.userInfo);
    const userId = useSelector(state => state.authenticator.userId);

    useEffect(() => {
        dispatch(userInfoActions.getUserInfo(userId));
    }, []);

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={accountStyles.headerLogoImage}
            onPress={onPress}
        >
            {fetchedUserInfo.logo ? (
                <Image
                    style={accountStyles.headerLogoImage}
                    source={{ uri: fetchedUserInfo.logo }}
                />
            ) : (
                <MaterialCommunityIcons
                    name="image-plus"
                    size={appTheme.Size.size42}
                    color={Colors.primaryDarker}
                />
            )}
        </TouchableOpacity>
    );
};

export default AddPictureComponent;
