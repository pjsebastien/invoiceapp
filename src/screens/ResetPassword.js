import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import React from 'react';
import authenticatorStyles from '../styles/authenticator/authenticatorStyles';
import { Controller, useForm } from 'react-hook-form';
import * as authActions from '../store/actions/authenticator';
import { useNavigation } from '@react-navigation/native';

const ResetPassword = () => {
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async data => {
        try {
            await authActions.resetPassword(data.email);
            Alert.alert(
                `Nous vous avons envoyé un mail de réinitialisation du mot de passe`,
                `Suivez les intructions, et revenez vous connecter sur l'application.`,
            );
            navigation.navigate('authenticator');
        } catch (error) {
            switch (error.message) {
                case 'EMAIL_NOT_FOUND':
                    Alert.alert(
                        `Réinitialisation du mot de passe impossible`,
                        `Cette adresse email n'a pas été reconnue.`,
                    );
                    break;
                default:
                    Alert.alert(
                        `Réinitialisation du mot de passe impossible`,
                        `Une erreur est survenue, merci de réessayer plus tard.`,
                    );
            }
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            bahavior={Platform.OS === 'android' ? 'height' : 'padding'}
        >
            <View style={authenticatorStyles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={authenticatorStyles.secondaryContainer}>
                        <Text>
                            Saisissez votre adresse mail pour recevoir un lien de
                            réinitialisation du mot de passe.
                        </Text>
                        <View style={authenticatorStyles.formContainer}>
                            <Text style={authenticatorStyles.label}>
                                Entrez votre adresse mail
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        placeholder="e-mail"
                                        keyboardType="email-address"
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        style={authenticatorStyles.input}
                                    />
                                )}
                                name="email"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Adresse mail non renseignée.',
                                    },
                                    pattern: {
                                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Adresse mail non valide.',
                                    },
                                }}
                            />
                            {errors.email && (
                                <Text style={authenticatorStyles.errorMessage}>
                                    {errors.email.message}
                                </Text>
                            )}
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <View style={authenticatorStyles.submitButton}>
                                <Text style={authenticatorStyles.submitButtonText}>
                                    Envoyer mail
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ResetPassword;
