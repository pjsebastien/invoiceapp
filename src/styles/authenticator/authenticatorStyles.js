import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';

const authenticatorStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.third,
    },
    secondaryContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainTitle: {
        color: Colors.secondary,
        fontSize: appTheme.Size.size30,
        marginTop: appTheme.Size.size2,
        fontFamily: 'Orkney-bold',
    },
    formContainer: {
        marginTop: appTheme.Size.size20,
    },
    input: {
        marginTop: appTheme.Size.size2,
        backgroundColor: Colors.backgroundSecondary,
        padding: appTheme.Size.size5,
        borderRadius: 10,
        width: Dimensions.get('screen').width * 0.75,
    },
    label: {
        marginTop: appTheme.Size.size10,
        color: Colors.textPrimary,
        fontFamily: 'Orkney-regular',
        marginBottom: appTheme.Size.size2,
    },
    errorMessage: {
        color: Colors.secondary,
        fontSize: appTheme.Size.size10,
        marginTop: appTheme.Size.size2,
        fontFamily: 'Orkney-regular',
    },
    submitButton: {
        backgroundColor: Colors.primary,
        paddingVertical: appTheme.Size.size8,
        paddingHorizontal: appTheme.Size.size36,
        marginTop: appTheme.Size.size28,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonText: {
        color: Colors.backgroundSecondary,
        fontSize: appTheme.Size.size16,
        fontFamily: 'Orkney-bold',
    },
    privacyPolicy: {
        width: Dimensions.get('screen').width * 0.75,
        fontSize: appTheme.Size.size10,
        fontFamily: 'Orkney-regular',
        color: Colors.textPrimary,
        marginTop: appTheme.Size.size10,
    },
    switchButton: {
        marginTop: appTheme.Size.size10,
        color: Colors.textPrimary,
    },
    resetPassword: {
        marginTop: appTheme.Size.size16,
        color: Colors.textPrimary,
        fontSize: appTheme.Size.size10,
        fontFamily: 'Orkney-regular',
    },
});

export default authenticatorStyles;
