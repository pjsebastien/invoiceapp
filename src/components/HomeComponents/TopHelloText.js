import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import homeStyles from '../../styles/home/homeStyles';

const TopHelloText = () => {
    return (
        <View style={homeStyles.topTextContainer}>
            <Text style={homeStyles.topFirstText}>bonjour,</Text>
            <Text style={homeStyles.topSecondText}>sébastien</Text>
        </View>
    );
};

export default TopHelloText;
