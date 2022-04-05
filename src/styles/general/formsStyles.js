import { StyleSheet } from 'react-native';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';

const formStyles = StyleSheet.create({
    logoPicker: {
        alignItems: 'center',
        marginBottom: appTheme.Size.size20,
    },
    formContainer: {
        padding: appTheme.Size.size6,
        borderRadius: 15,
    },
    formLabelText: {
        fontSize: appTheme.Size.size14,
        color: Colors.primaryDarker,
        fontFamily: 'Orkney-bold',
        marginTop: 5,
    },
    formInput: {
        padding: 3,
        marginBottom: 3,
    },
    formInputAdress: {
        padding: 3,
    },
});

export default formStyles;
