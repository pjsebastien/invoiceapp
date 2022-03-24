import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../theme/colors';
import buttonsStyles from '../../styles/general/buttonsStyles';
import appTheme from '../../theme/fonts';

const DrawerMenuButtonComponent = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={buttonsStyles.ButtonTop}
            onPress={() => navigation.toggleDrawer()}
        >
            <AntDesign
                name="menu-fold"
                size={appTheme.Size.size20}
                color={Colors.backgroundSecondary}
            />
        </TouchableOpacity>
    );
};

export default DrawerMenuButtonComponent;
