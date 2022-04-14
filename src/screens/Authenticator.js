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
import React, { useState } from 'react';
import authenticatorStyles from '../styles/authenticator/authenticatorStyles';
import { Controller, useForm } from 'react-hook-form';
import * as authActions from '../store/actions/authenticator';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Authenticator = props => {
    const [loginMode, setLoginMode] = useState(false);
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const dispatch = useDispatch();
    // const isAuth = useSelector(state => state.authenticator.userId);

    const onSubmit = async data => {
        if (loginMode) {
            //connexion
            try {
                await dispatch(authActions.login(data.email, data.password));
                navigation.navigate('app');
            } catch (error) {
                switch (error.message) {
                    case 'EMAIL_NOT_FOUND':
                        Alert.alert(
                            `Connexion impossible`,
                            `Cette adresse email n'a pas été reconnue.`,
                        );
                        break;
                    case 'INVALID_PASSWORD':
                        Alert.alert(`Connexion impossible`, `Mot de passe incorrect.`);
                        break;
                    case 'USER_DISABLED':
                        Alert.alert(
                            `Connexion impossible`,
                            `Votre compte a été désactivé.`,
                        );
                        break;
                    default:
                        Alert.alert(
                            `Connexion impossible`,
                            `Une erreur est survenue, merci de réessayer plus tard.`,
                        );
                }
            }
        } else {
            try {
                await dispatch(authActions.signUp(data.email, data.password));
                navigation.navigate('app');
            } catch (error) {
                switch (error.message) {
                    case 'EMAIL_EXISTS':
                        Alert.alert(
                            `Inscription impossible`,
                            `Cette adresse email est déjà utilisé sur un autre compte.`,
                        );
                        break;
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                        Alert.alert(
                            `Inscription impossible`,
                            `Nous avons bloqué toutes les demandes de cet appareil en raison d'une activité inhabituelle. Réessayez plus tard.`,
                        );
                        break;
                    default:
                        Alert.alert(
                            `Inscription impossible`,
                            `Une erreur est survenue, merci de réessayer plus tard.`,
                        );
                }
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
                        <Text style={authenticatorStyles.mainTitle}>InvoiceApp</Text>
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
                            <Text style={authenticatorStyles.label}>
                                Entrez votre mot de passe
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        placeholder="Mot de passe"
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        secureTextEntry={true}
                                        style={authenticatorStyles.input}
                                    />
                                )}
                                name="password"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Mot de passe non renseigné.',
                                    },
                                    minLength: {
                                        value: 8,
                                        message:
                                            'Le mot de passe doit contenir au moins 8 caractères.',
                                    },
                                }}
                            />
                            {errors.password && (
                                <Text style={authenticatorStyles.errorMessage}>
                                    {errors.password.message}
                                </Text>
                            )}
                            {loginMode ? null : (
                                <View>
                                    <Text style={authenticatorStyles.label}>
                                        Confirmez votre mot de passe
                                    </Text>
                                    <Controller
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <TextInput
                                                placeholder="Confirmez le mot de passe"
                                                value={value}
                                                onChangeText={value => onChange(value)}
                                                secureTextEntry={true}
                                                style={authenticatorStyles.input}
                                            />
                                        )}
                                        name="confirmPassword"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Confimez votre mot de passe.',
                                            },
                                            validate: val => {
                                                if (watch('password') != val) {
                                                    return 'Vos mots de passes ne correspondent pas.';
                                                }
                                            },
                                        }}
                                    />
                                    {errors.confirmPassword && (
                                        <Text style={authenticatorStyles.errorMessage}>
                                            {errors.confirmPassword.message}
                                        </Text>
                                    )}
                                </View>
                            )}
                        </View>
                        <Text style={authenticatorStyles.privacyPolicy}>
                            {loginMode
                                ? null
                                : `* En vous inscrivant, vous accepter nos conditions générales d'utilisation que vous pouvez consulter en cliquant sur ce lien`}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <View style={authenticatorStyles.submitButton}>
                                <Text style={authenticatorStyles.submitButtonText}>
                                    {loginMode ? `Se connecter` : `S'inscrire`}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={() => setLoginMode(prevState => !prevState)}
                        >
                            <Text style={authenticatorStyles.switchButton}>
                                {loginMode
                                    ? `Pas encore inscrit ? S'incrire.`
                                    : `Déjà inscrit ? Se connecter.`}
                            </Text>
                        </TouchableOpacity>
                        {loginMode ? (
                            <TouchableOpacity
                                activeOpacity={0.75}
                                onPress={() => navigation.navigate('resetPassword')}
                            >
                                <Text style={authenticatorStyles.resetPassword}>
                                    Mot de passe oublié ?
                                </Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </SafeAreaView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Authenticator;
