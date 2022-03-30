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
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    headerCompany: {
        fontSize: appTheme.Size.size16,
        color: Colors.textPrimary,
    },
    infoContainer: {
        marginVertical: appTheme.Size.size25,
        padding: appTheme.Size.size10,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleInfo: {
        fontSize: appTheme.Size.size20,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    infoTextContainer: {
        marginTop: appTheme.Size.size8,
    },
    labelInfo: {
        fontSize: appTheme.Size.size12,
        color: Colors.primaryDarker,
        fontWeight: 'bold',
    },
    textInfo: {
        marginTop: appTheme.Size.size2,
        marginBottom: appTheme.Size.size8,
        fontSize: appTheme.Size.size16,
        color: Colors.textPrimary,
    },
});

export default accountStyles;
