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
});

export default generalStyles;
