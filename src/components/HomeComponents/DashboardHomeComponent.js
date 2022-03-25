import { View } from 'react-native';
import React from 'react';
import homeDashboardStyles from '../../styles/home/homeDashboardStyles';

import { useSelector } from 'react-redux';

import DashBoardSmallCardComponent from './DashBoardSmallCardComponent';
import DashboardInvoiceCardComponents from './DashboardInvoiceCardComponents';
import DashboardChartCardComponent from './DashboardChartCardComponent';

const DashboardHomeComponent = () => {
    const invoices = useSelector(state => state.app.invoices);

    return (
        <View style={homeDashboardStyles.mainContainer}>
            <View style={homeDashboardStyles.sideContainer}>
                <DashBoardSmallCardComponent
                    title={'Devis'}
                    number={'5'}
                    status={'En cours'}
                />

                <DashboardChartCardComponent />
            </View>
            <View style={homeDashboardStyles.sideContainer}>
                <DashboardInvoiceCardComponents
                    title={'factures'}
                    number={invoices.length}
                    status={'En cours'}
                />

                <DashBoardSmallCardComponent
                    title={'Clients'}
                    number={'50'}
                    status={'Enregistrés'}
                />
            </View>
        </View>
    );
};

export default DashboardHomeComponent;
