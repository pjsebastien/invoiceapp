import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';

const customerCard = StyleSheet.create({
    cardContainer: {
        width: Dimensions.get('window').width - appTheme.Size.size30,
        marginVertical: appTheme.Size.size10,
        backgroundColor: Colors.backgroundColor,
        borderRadius: 10,
        paddingHorizontal: appTheme.Size.size10,
        paddingVertical: appTheme.Size.size10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5.84,
        elevation: 3,
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    customerNameText: {
        color: Colors.textPrimary,
        fontFamily: 'Orkney-bold',
        fontSize: appTheme.Size.size18,
    },
    customerTypeText: {
        color: Colors.textPrimary,
        fontFamily: 'Orkney-regular',
        fontSize: appTheme.Size.size8,
        marginBottom: appTheme.Size.size8,
    },
    customerSentText: {
        color: Colors.textPrimary,
        fontFamily: 'Orkney-regular',
        fontSize: appTheme.Size.size12,
        marginTop: appTheme.Size.size2,
    },
    productsDetailsCard: {
        height: 50,
    },
    customerDescriptionText: {
        color: Colors.textPrimary,
        fontFamily: 'Orkney-regular',
        fontSize: appTheme.Size.size12,
        marginTop: appTheme.Size.size2,
    },
});

export default customerCard;
