import { StyleSheet } from 'react-native';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';

const accountStyles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: appTheme.Size.size25,
    },
    headerLogoImage: {
        borderRadius: 100,
        width: appTheme.Size.size100,
        height: appTheme.Size.size100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.third,
    },
    headerRightContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginRight: appTheme.Size.size15,
    },
    headerName: {
        fontSize: appTheme.Size.size30,
        color: Colors.textPrimary,
        fontFamily: 'Orkney-bold',
    },
    headerCompany: {
        fontSize: appTheme.Size.size16,
        color: Colors.textPrimary,
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
});

export default accountStyles;
