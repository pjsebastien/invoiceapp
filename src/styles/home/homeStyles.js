import { StyleSheet } from 'react-native';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';

const homeStyles = StyleSheet.create({
    topButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    topTextContainer: {
        marginVertical: appTheme.Size.size24,
        marginHorizontal: appTheme.Size.size10,
    },
    topFirstText: {
        textTransform: 'capitalize',
        fontWeight: '200',
        fontSize: appTheme.Size.size20,
        color: Colors.textPrimary,
    },
    topSecondText: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: appTheme.Size.size32,
        color: Colors.textPrimary,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default homeStyles;
