import { TouchableOpacity, Text } from 'react-native';
import buttonsStyles from '../../styles/general/buttonsStyles';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';

const ProfileButtonComponent = () => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={buttonsStyles.ButtonTop}>
            <FontAwesome5
                name="user"
                size={appTheme.Size.size20}
                color={Colors.backgroundSecondary}
            />
        </TouchableOpacity>
    );
};

export default ProfileButtonComponent;
