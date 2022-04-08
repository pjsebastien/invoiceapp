import { StyleSheet } from 'react-native';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';

const homeStyles = StyleSheet.create({
    topTextContainer: {
        marginVertical: appTheme.Size.size24,
        marginHorizontal: appTheme.Size.size10,
    },
    topFirstText: {
        textTransform: 'capitalize',
        fontWeight: '200',
        fontSize: appTheme.Size.size20,
        color: Colors.textPrimary,
        fontFamily: 'Orkney-regular',
    },
    topSecondText: {
        textTransform: 'capitalize',
        fontSize: appTheme.Size.size32,
        color: Colors.textPrimary,
        fontFamily: 'Orkney-bold',
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default homeStyles;
