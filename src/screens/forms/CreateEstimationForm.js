import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import BackButtonComponent from '../../components/ButtonsComponents/BackButtonComponent';
import buttonsStyles from '../../styles/general/buttonsStyles';
import generalStyles from '../../styles/general/generalStyles';
import ViewButtonComponent from '../../components/ButtonsComponents/ViewButtonComponent';

const CreateEstimationForm = () => {
    return (
        <View style={generalStyles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={generalStyles.container}>
                    <View style={buttonsStyles.topButtons}>
                        <BackButtonComponent />
                        <Text style={generalStyles.titleScreenText}>Nouveau Devis</Text>
                        <ViewButtonComponent />
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default CreateEstimationForm;
