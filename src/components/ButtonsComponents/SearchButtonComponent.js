import { TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import appTheme from '../../theme/fonts';
import Colors from '../../theme/colors';
import buttonsStyles from '../../styles/general/buttonsStyles';

const SearchButtonComponent = ({ onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={buttonsStyles.ButtonTop}>
            <AntDesign
                name="search1"
                size={appTheme.Size.size20}
                color={Colors.backgroundSecondary}
                onPress={onPress}
            />
        </TouchableOpacity>
    );
};

export default SearchButtonComponent;
