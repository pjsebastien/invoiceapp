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
    selectCustomerContainer: {
        backgroundColor: Colors.primaryDarker,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: appTheme.Size.size12,
        marginVertical: appTheme.Size.size10,
        height: appTheme.Size.size100,
        borderRadius: 12,
    },
    selectPaymentContainer: {
        backgroundColor: Colors.primaryDarker,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: appTheme.Size.size12,
        marginVertical: appTheme.Size.size10,

        borderRadius: 12,
    },

    selectCustomerText: {
        color: Colors.backgroundSecondary,
        fontFamily: 'Orkney-bold',
        fontSize: appTheme.Size.size16,
        width: '80%',
    },
    selectCustomerTextSmall: {
        color: Colors.backgroundSecondary,
        fontFamily: 'Orkney-regular',
        fontSize: appTheme.Size.size10,
    },
    calendarContainer: {
        marginVertical: appTheme.Size.size12,
    },
    calendarTopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    calendarText: {
        paddingLeft: appTheme.Size.size12,
        fontFamily: 'Orkney-bold',
        fontSize: appTheme.Size.size14,
        color: Colors.textPrimary,
    },
    selectProductContainer: {
        backgroundColor: Colors.third,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: appTheme.Size.size12,
        marginVertical: appTheme.Size.size10,

        borderRadius: 12,
    },
    selectProductText: {
        color: Colors.textPrimary,
        fontFamily: 'Orkney-bold',
        fontSize: appTheme.Size.size16,
        width: '80%',
    },
    selectTermsText: {
        color: Colors.textPrimary,
        fontFamily: 'Orkney-regular',
        fontSize: appTheme.Size.size12,
        width: '80%',
    },
    selectedProductContainer: {
        backgroundColor: Colors.thirdLighter,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: appTheme.Size.size12,
        marginVertical: appTheme.Size.size4,
        height: appTheme.Size.size50,
        borderRadius: 12,
    },
    selectedProductText: {
        color: Colors.textPrimary,
        fontFamily: 'Orkney-regular',
        fontSize: appTheme.Size.size14,
    },
    counterContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.thirdLighter,
        height: appTheme.Size.size28,
        borderRadius: 10,
    },
    counterLeft: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    counterMiddle: {
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.backgroundSecondary,
    },
    counterRight: {
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formLabelTextTotal: {
        fontSize: appTheme.Size.size14,
        color: Colors.primaryDarker,
        fontFamily: 'Orkney-bold',
        marginTop: 3,
    },
    totalAmount: {
        fontSize: appTheme.Size.size20,
        color: Colors.thirdDarker,
        fontFamily: 'Orkney-bold',
        marginTop: 3,
    },
    subTotalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    attachmentPreview: {
        marginVertical: appTheme.Size.size10,
        alignItems: 'center',
    },
    attachmentImage: {
        height: appTheme.Size.size150,
        width: appTheme.Size.size130,
        opacity: 0.7,
    },
    errorMessage: {
        color: Colors.secondary,
        fontSize: appTheme.Size.size10,
        marginTop: appTheme.Size.size2,
        fontFamily: 'Orkney-regular',
    },
});

export default formStyles;
