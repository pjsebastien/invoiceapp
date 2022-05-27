import {
    View,
    Text,
    SafeAreaView,
    Modal,
    TouchableOpacity,
    TextInput,
    FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../theme/colors';
import appTheme from '../theme/fonts';
import { useDispatch, useSelector } from 'react-redux';
import * as paymentModeActions from '../store/actions/invoiceDetails';

import generalStyles from '../styles/general/generalStyles';
import buttonsStyles from '../styles/general/buttonsStyles';
import formsStyles from '../styles/general/formsStyles';
import modalStyles from '../styles/general/modalStyles';

import BackButtonComponent from '../components/ButtonsComponents/BackButtonComponent';
import AddButtonComponent from '../components/ButtonsComponents/AddButtonComponent';
import DeleteButtonComponent from '../components/ButtonsComponents/DeleteButtonComponent';
import PaymentModeCard from '../components/PaymentModeComponents/PaymentModeCard';

const Payments = ({ route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [onFocusInput, setOnFocusInput] = useState(null);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.authenticator.userId);
    const fetchedPaymentMode = useSelector(state => state.app.paymentMode);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        dispatch(paymentModeActions.getPaymentMode(userId));
    }, []);

    const onSubmit = data => {
        const paymentMode = {
            name: data.paymentMode,
        };

        dispatch(paymentModeActions.addPaymentMode(userId, paymentMode));
        dispatch(paymentModeActions.getPaymentMode(userId));
        setModalVisible(!modalVisible);
    };
    return (
        <View style={generalStyles.mainContainer}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={modalStyles.centeredView}>
                    <View style={modalStyles.modalView}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 25,
                            }}
                        >
                            <Text style={formsStyles.formLabelText}>
                                Nouveau mode de paiement{' '}
                            </Text>
                            <DeleteButtonComponent
                                size={20}
                                color={Colors.third}
                                onPress={() => setModalVisible(!modalVisible)}
                            />
                        </View>
                        <View>
                            <View>
                                <Controller
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <TextInput
                                            style={
                                                onFocusInput === 'paymentMode'
                                                    ? formsStyles.formBorderBottomFocused
                                                    : formsStyles.formInput
                                            }
                                            onFocus={() => setOnFocusInput('paymentMode')}
                                            onBlur={() => setOnFocusInput('')}
                                            placeholder={'Mode de paiement'}
                                            value={value}
                                            onChangeText={value => onChange(value)}
                                            multiline={true}
                                        />
                                    )}
                                    name="paymentMode"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Champ obligatoire.',
                                        },
                                        minLength: {
                                            value: 1,
                                            message:
                                                'Veuillez insérer une valeur supérieur ou égal à 1 caractères',
                                        },
                                    }}
                                />
                                {errors.paymentMode && (
                                    <Text style={formsStyles.errorMessage}>
                                        {errors.paymentMode.message}
                                    </Text>
                                )}
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginTop: 25,
                            }}
                        >
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={buttonsStyles.ButtonTop}
                                onPress={handleSubmit(onSubmit)}
                            >
                                <AntDesign
                                    name="check"
                                    size={appTheme.Size.size20}
                                    color={Colors.backgroundSecondary}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <SafeAreaView style={generalStyles.container}>
                <View style={buttonsStyles.topButtons}>
                    <BackButtonComponent onPress={() => navigation.goBack()} />
                    <Text style={generalStyles.titleScreenText}>Mode de paiement</Text>
                    <View style={buttonsStyles.ButtonInvisible}></View>
                </View>
                <View style={{ marginTop: 20, flex: 1 }}>
                    {fetchedPaymentMode.length >= 1 ? (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={fetchedPaymentMode}
                            renderItem={({ item }) => {
                                return <PaymentModeCard data={item} key={item.id} />;
                            }}
                        />
                    ) : (
                        <View style={generalStyles.noDataContainer}>
                            <Text style={generalStyles.noDataText}>
                                Aucun mode de paiement.
                            </Text>
                        </View>
                    )}
                </View>
            </SafeAreaView>
            <AddButtonComponent onPress={() => setModalVisible(!modalVisible)} />
        </View>
    );
};

export default Payments;
