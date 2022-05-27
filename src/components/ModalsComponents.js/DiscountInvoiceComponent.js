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

const DiscountInvoiceComponent = ({
    modalVisible,
    setModalVisible,
    setFixDiscount,
    setPercentDiscount,
}) => {
    const [onFocusInput, setOnFocusInput] = useState(null);
    const [isSelected, setSelection] = useState(true);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = data => {
        isSelected
            ? (setFixDiscount(data.discountFix), setPercentDiscount(0))
            : (setPercentDiscount(data.discountPercent), setFixDiscount(0));
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
                        <Text style={formsStyles.formLabelText}>Remise </Text>
                        <DeleteButtonComponent
                            size={20}
                            color={Colors.third}
                            onPress={() => setModalVisible(!modalVisible)}
                        />
                    </View>
                    <View>
                        <View>
                            <View style={formsStyles.checkBoxesContainer}>
                                <View style={formsStyles.checkBoxContainer}>
                                    <Checkbox
                                        value={isSelected}
                                        onValueChange={() => setSelection(!isSelected)}
                                        style={formsStyles.checkBox}
                                    />
                                    <Text style={formsStyles.checkBoxLabel}>
                                        Fixe (€)
                                    </Text>
                                </View>
                                <View style={formsStyles.checkBoxContainer}>
                                    <Checkbox
                                        value={!isSelected}
                                        onValueChange={() => setSelection(!isSelected)}
                                        style={formsStyles.checkBox}
                                    />
                                    <Text style={formsStyles.checkBoxLabel}>
                                        Pourcentage (%)
                                    </Text>
                                </View>
                            </View>
                            {isSelected ? (
                                <>
                                    <Controller
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <TextInput
                                                style={
                                                    onFocusInput === 'discountFix'
                                                        ? formsStyles.formBorderBottomFocused
                                                        : formsStyles.formInput
                                                }
                                                onFocus={() =>
                                                    setOnFocusInput('discountFix')
                                                }
                                                onBlur={() => setOnFocusInput('')}
                                                placeholder={'Remise appliquée'}
                                                value={value}
                                                onChangeText={value => onChange(value)}
                                                keyboardType="numeric"
                                            />
                                        )}
                                        name="discountFix"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Champ obligatoire.',
                                            },
                                            min: {
                                                value: 0,
                                                message:
                                                    'Veuillez insérer une valeur supérieur ou égal à 0',
                                            },
                                        }}
                                    />
                                    {errors.discountFix && (
                                        <Text style={formsStyles.errorMessage}>
                                            {errors.discountFix.message}
                                        </Text>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Controller
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <TextInput
                                                style={
                                                    onFocusInput === 'discountPercent'
                                                        ? formsStyles.formBorderBottomFocused
                                                        : formsStyles.formInput
                                                }
                                                onFocus={() =>
                                                    setOnFocusInput('discountPercent')
                                                }
                                                onBlur={() => setOnFocusInput('')}
                                                placeholder={'Remise appliquée'}
                                                value={value}
                                                onChangeText={value => onChange(value)}
                                                keyboardType="numeric"
                                            />
                                        )}
                                        name="discountPercent"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Champ obligatoire.',
                                            },
                                            min: {
                                                value: 0,
                                                message:
                                                    'Veuillez insérer une valeur supérieure ou égal à 0',
                                            },
                                            max: {
                                                value: 100,
                                                message:
                                                    'Veuillez insérer une valeur inférieure ou égal à 100',
                                            },
                                        }}
                                    />
                                    {errors.discountPercent && (
                                        <Text style={formsStyles.errorMessage}>
                                            {errors.discountPercent.message}
                                        </Text>
                                    )}
                                </>
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

export default DiscountInvoiceComponent;
