import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';

const paymentModeCard = StyleSheet.create({
    cardContainer: {
        width: Dimensions.get('window').width - appTheme.Size.size30,
        marginVertical: appTheme.Size.size10,
        backgroundColor: Colors.backgroundColor,
        borderRadius: 10,
        paddingHorizontal: appTheme.Size.size10,
        paddingVertical: appTheme.Size.size10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: Colors.secondary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5.84,
        elevation: 3,
    },
    paymentNameContainer: {
        width: '80%',
    },
    paymentNameText: {
        color: Colors.textPrimary,
        fontFamily: 'Orkney-regular',
        fontSize: appTheme.Size.size18,
    },
    termsNameText: {
        color: Colors.textPrimary,
        fontFamily: 'Orkney-regular',
        fontSize: appTheme.Size.size12,
    },
});

export default paymentModeCard;
