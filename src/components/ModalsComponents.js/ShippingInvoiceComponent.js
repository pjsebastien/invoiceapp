import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Checkbox from 'expo-checkbox';
import { AntDesign } from '@expo/vector-icons';

import appTheme from '../../theme/fonts';
import Colors from '../../theme/colors';

import buttonsStyles from '../../styles/general/buttonsStyles';
import modalStyles from '../../styles/general/modalStyles';
import formsStyles from '../../styles/general/formsStyles';

import DeleteButtonComponent from '../ButtonsComponents/DeleteButtonComponent';

const ShippingInvoiceComponent = ({ modalVisible, setModalVisible, setShipping }) => {
    const [onFocusInput, setOnFocusInput] = useState(null);
    const [isSelected, setSelection] = useState(true);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = data => {
        if (data.shippingTva > 0) {
            let shipping =
                Number(data.shippingCost) +
                (Number(data.shippingCost) * Number(data.shippingTva)) / 100;
            setShipping(shipping);
        } else {
            setShipping(data.shippingCost);
        }

        setModalVisible(!modalVisible);
    };
    return (
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
                        <Text style={formsStyles.formLabelText}>Frais de livraison </Text>
                        <DeleteButtonComponent
                            size={20}
                            color={Colors.third}
                            onPress={() => setModalVisible(!modalVisible)}
                        />
                    </View>
                    <View>
                        <View>
                            <Text style={formsStyles.formLabelText}>
                                Frais de livraison (???) :
                            </Text>

                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'shippingCost'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('shippingCost')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder={'Remise appliqu??e'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        keyboardType="numeric"
                                    />
                                )}
                                name="shippingCost"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Champ obligatoire.',
                                    },
                                    min: {
                                        value: 0,
                                        message:
                                            'Veuillez ins??rer une valeur sup??rieur ou ??gal ?? 0',
                                    },
                                }}
                            />
                            {errors.shippingCost && (
                                <Text style={formsStyles.errorMessage}>
                                    {errors.shippingCost.message}
                                </Text>
                            )}
                            <Text style={formsStyles.formLabelText}>
                                Tva si applicable (%) :
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'shippingTva'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('shippingTva')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder={'Remise appliqu??e'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        keyboardType="numeric"
                                    />
                                )}
                                name="shippingTva"
                                rules={{
                                    min: {
                                        value: 0,
                                        message:
                                            'Veuillez ins??rer une valeur sup??rieure ou ??gal ?? 0',
                                    },
                                    max: {
                                        value: 100,
                                        message:
                                            'Veuillez ins??rer une valeur inf??rieure ou ??gal ?? 100',
                                    },
                                }}
                            />
                            {errors.shippingTva && (
                                <Text style={formsStyles.errorMessage}>
                                    {errors.shippingTva.message}
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
    );
};

export default ShippingInvoiceComponent;
