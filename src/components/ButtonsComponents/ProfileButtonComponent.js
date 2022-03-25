import { TouchableOpacity, Text } from 'react-native';
import buttonsStyles from '../../styles/general/buttonsStyles';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';
import { useNavigation } from '@react-navigation/native';

const ProfileButtonComponent = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={buttonsStyles.ButtonTop}
            onPress={() => navigation.navigate('test')}
        >
            <FontAwesome5
                name="user"
                size={appTheme.Size.size20}
                color={Colors.backgroundSecondary}
            />
        </TouchableOpacity>
    );
};

export default ProfileButtonComponent;
