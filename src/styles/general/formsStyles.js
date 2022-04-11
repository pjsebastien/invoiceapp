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
    headerFormTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: appTheme.Size.size16,
    },
    headerFormTitle: {
        fontSize: appTheme.Size.size24,
        color: Colors.third,
        fontFamily: 'Orkney-bold',
    },
    formLabelText: {
        fontSize: appTheme.Size.size14,
        color: Colors.primaryDarker,
        fontFamily: 'Orkney-bold',
        marginTop: 5,
    },
    formLabelSmallText: {
        fontSize: appTheme.Size.size10,
        color: Colors.primaryDarker,
        fontFamily: 'Orkney-bold',
        marginTop: 5,
    },
    formInput: {
        padding: 4,
        marginBottom: 3,
    },
    formInputCustomer: {
        padding: 4,
        marginBottom: 3,
        textAlignVertical: 'top',
    },
    formInputAdress: {
        padding: 4,
    },
    formBorderBottomFocused: {
        padding: 3,
        marginBottom: 3,
        borderWidth: 2,
        borderColor: 'transparent',
        borderBottomColor: Colors.primary,
    },
    formBorderCustomerBottomFocused: {
        padding: 3,
        marginBottom: 3,
        borderWidth: 2,
        borderColor: 'transparent',
        borderBottomColor: Colors.primary,
        textAlignVertical: 'top',
    },
    checkBoxesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: appTheme.Size.size16,
    },
    checkBoxContainer: {
        flexDirection: 'row',
    },
    checkBox: {
        marginRight: appTheme.Size.size8,
        borderRadius: 15,
        borderColor: Colors.primaryDarker,
    },
    checkBoxLabel: {
        fontSize: appTheme.Size.size14,
        color: Colors.primaryDarker,
        fontFamily: 'Orkney-bold',
    },
    ttcText: {
        fontSize: appTheme.Size.size14,
        color: Colors.textPrimary,
        fontFamily: 'Orkney-regular',
        paddingVertical: appTheme.Size.size6,
        paddingLeft: appTheme.Size.size6,

        marginBottom: 3,
    },
});

export default formStyles;
