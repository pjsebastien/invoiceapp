import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';

const accountStyles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: appTheme.Size.size25,
    },
    headerLogoImage: {
        borderRadius: 75,
        width: appTheme.Size.size150,
        height: appTheme.Size.size150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.third,
    },
    headerTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: appTheme.Size.size10,
    },
    headerName: {
        fontSize: appTheme.Size.size30,
        color: Colors.primaryDarker,
        fontFamily: 'Orkney-bold',
    },
    headerCompany: {
        fontSize: appTheme.Size.size16,
        color: Colors.primary,
        fontFamily: 'Orkney-regular',
    },
    infoContainer: {
        marginVertical: appTheme.Size.size25,
        padding: appTheme.Size.size16,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: Colors.textPrimary,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    titleInfo: {
        fontSize: appTheme.Size.size18,
        color: Colors.textPrimary,
        fontFamily: 'Orkney-bold',
    },
    infoTextContainer: {
        marginTop: appTheme.Size.size8,
    },
    labelInfo: {
        fontSize: appTheme.Size.size12,
        color: Colors.primaryDarker,
        fontFamily: 'Orkney-bold',
    },
    textInfo: {
        marginTop: appTheme.Size.size2,
        marginBottom: appTheme.Size.size8,
        fontSize: appTheme.Size.size16,
        color: Colors.textPrimary,
        fontFamily: 'Orkney-regular',
    },
    buttonModalContainer: {
        alignItems: 'center',
        width: Dimensions.get('window').width - appTheme.Size.size30,
        marginBottom: appTheme.Size.size10,
    },
    imageSign64: {
        width: Dimensions.get('window').width - appTheme.Size.size30,
        height: appTheme.Size.size130,
    },
    imageSign64Void: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: appTheme.Size.size16,
        color: Colors.textPrimary,
        fontFamily: 'Orkney-bold',
    },
    saveButtonContainer: {
        marginBottom: appTheme.Size.size36,
    },
    signTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default accountStyles;
