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
        marginBottom: appTheme.Size.size2,
    },
    errorMessage: {
        color: Colors.secondary,
        fontSize: appTheme.Size.size12,
        marginTop: appTheme.Size.size2,
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
        fontWeight: 'bold',
    },
    privacyPolicy: {
        width: Dimensions.get('screen').width * 0.75,
        fontSize: appTheme.Size.size12,
        color: Colors.textPrimary,
        marginTop: appTheme.Size.size10,
    },
    switchButton: {
        marginTop: appTheme.Size.size10,
        color: Colors.textPrimary,
    },
});

export default authenticatorStyles;
