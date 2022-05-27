import { StyleSheet, Platform } from 'react-native';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';

const generalStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        paddingHorizontal: appTheme.Size.size15,
    },
    container: {
        flex: 1,
        marginTop:
            Platform.OS === 'android' ? appTheme.Size.size40 : appTheme.Size.size20,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        paddingHorizontal: appTheme.Size.size15,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    titleScreenText: {
        fontSize: appTheme.Size.size18,
        color: Colors.thirdDarker,
        fontFamily: 'Orkney-bold',
    },
    searchInput: {
        width: appTheme.Size.size160,
    },
    noDataContainer: {
        alignItems: 'center',
    },
    noDataText: {
        fontSize: appTheme.Size.size18,
        color: Colors.primaryDarker,
        fontFamily: 'Orkney-bold',
        marginTop: appTheme.Size.size150,
    },
    flexRowJustifyBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    classicTextStyle: {
        fontSize: appTheme.Size.size14,
        color: Colors.textPrimary,
        fontFamily: 'Orkney-regular',
    },
});

export default generalStyles;
