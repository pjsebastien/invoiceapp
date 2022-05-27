import { View } from 'react-native';

import React from 'react';
import homeStyles from '../../styles/home/homeStyles';
import ActionButtonComponent from '../ButtonsComponents/ActionButtonComponent';
import { useNavigation } from '@react-navigation/native';
import appTheme from '../../theme/fonts';

const ActionsButtonComponent = () => {
    const navigation = useNavigation();
    return (
        <View style={homeStyles.actionButtonsContainer}>
            <ActionButtonComponent
                sizeText={{ fontSize: appTheme.Size.size16 }}
                title={'créer devis'}
                onPress={() => navigation.navigate('createEstimationForm')}
            />
            <ActionButtonComponent
                sizeText={{ fontSize: appTheme.Size.size16 }}
                title={'créer facture'}
                onPress={() => navigation.navigate('createInvoiceForm')}
            />
        </View>
    );
};

export default ActionsButtonComponent;
