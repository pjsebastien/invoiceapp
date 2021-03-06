import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AntDesign } from '@expo/vector-icons';

import appTheme from '../../theme/fonts';
import Colors from '../../theme/colors';

import buttonsStyles from '../../styles/general/buttonsStyles';
import modalStyles from '../../styles/general/modalStyles';
import formsStyles from '../../styles/general/formsStyles';

import DeleteButtonComponent from '../ButtonsComponents/DeleteButtonComponent';

const TvaInvoiceComponent = ({ modalVisible, setModalVisible, setTva }) => {
    const [onFocusInput, setOnFocusInput] = useState(null);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = data => {
        setTva(data.tva);
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
                        <Text style={formsStyles.formLabelText}>
                            Tva en pourcentage (%){' '}
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
                                            onFocusInput === 'tva'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('tva')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder={'TVA appliqu??e'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        keyboardType="numeric"
                                    />
                                )}
                                name="tva"
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
                                    max: {
                                        value: 100,
                                        message:
                                            'Veuillez ins??rer une valeur inf??rieure ou ??gal ?? 100',
                                    },
                                }}
                            />
                            {errors.tva && (
                                <Text style={formsStyles.errorMessage}>
                                    {errors.tva.message}
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

export default TvaInvoiceComponent;
