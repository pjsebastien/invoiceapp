import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native-web';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';

const homeDashboardStyles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: appTheme.Size.size40,
        height: appTheme.Size.size440,
        marginBottom: appTheme.Size.size10,
    },
    sideContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: Colors.primary,
        borderRadius: appTheme.Size.size15,
        width: appTheme.Size.size160,
        height: appTheme.Size.size230,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    titleCard: {
        fontSize: appTheme.Size.size20,
        textTransform: 'capitalize',
        marginTop: appTheme.Size.size12,
        paddingLeft: appTheme.Size.size14,
        color: Colors.backgroundSecondary,
        fontFamily: 'Orkney-bold',
    },
    contentCardNumber: {
        fontSize: appTheme.Size.size50,
        fontWeight: 'bold',
        marginTop: -appTheme.Size.size12,
        paddingLeft: appTheme.Size.size14,
        color: Colors.backgroundSecondary,
        fontFamily: 'Source-serif-bold',
    },
    contentCardText: {
        fontSize: appTheme.Size.size14,
        paddingLeft: appTheme.Size.size20,
        marginTop: -appTheme.Size.size6,
        color: Colors.backgroundSecondary,
        fontFamily: 'Orkney-regular',
    },
    bottomCard: {
        backgroundColor: Colors.primaryDarker,
        height: appTheme.Size.size40,
        borderBottomLeftRadius: appTheme.Size.size15,
        borderBottomRightRadius: appTheme.Size.size15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBottomCard: {
        color: Colors.backgroundSecondary,
        fontFamily: 'Orkney-bold',
    },
    smallCard: {
        backgroundColor: Colors.third,
        borderRadius: appTheme.Size.size15,
        height: appTheme.Size.size190,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    eyeIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    eyeIcon: {
        marginBottom: -appTheme.Size.size10,
        marginRight: appTheme.Size.size5,
    },
});

export default homeDashboardStyles;
