import { View } from 'react-native';

import React from 'react';
import homeStyles from '../../styles/home/homeStyles';
import ActionButtonComponent from '../ButtonsComponents/ActionButtonComponent';

const ActionsButtonComponent = () => {
    return (
        <View style={homeStyles.actionButtonsContainer}>
            <ActionButtonComponent title={'créer devis'} />
            <ActionButtonComponent title={'créer facture'} />
        </View>
    );
};

export default ActionsButtonComponent;
