import { StyleSheet } from 'react-native';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';

const buttonsStyles = StyleSheet.create({
    ButtonTop: {
        backgroundColor: Colors.primary,
        borderRadius: 25,
        width: appTheme.Size.size40,
        height: appTheme.Size.size40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    profileButtonText: {
        color: Colors.backgroundSecondary,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    actionButtonContainer: {
        backgroundColor: Colors.backgroundSecondary,
        width: appTheme.Size.size160,
        paddingLeft: appTheme.Size.size14,
        paddingRight: appTheme.Size.size10,
        paddingVertical: appTheme.Size.size4,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    actionText: {
        color: Colors.primary,
        paddingRight: appTheme.Size.size4,
        fontSize: appTheme.Size.size16,
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    actionAddIcon: {
        top: appTheme.Size.size12,
        backgroundColor: Colors.backgroundColor,
        borderRadius: 100,
    },
});

export default buttonsStyles;
