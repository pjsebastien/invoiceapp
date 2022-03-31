import { View, Text, ScrollView, SafeAreaView, TextInput } from 'react-native';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import generalStyles from '../styles/general/generalStyles';
import formStyles from '../styles/general/formsStyles';
import FormTopButtonsComponent from '../components/ButtonsComponents/FormTopButtonsComponent';
import { useDispatch, useSelector } from 'react-redux';
import * as userInfoActions from '../store/actions/userInfo';

const UserInfoForm = props => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const userId = useSelector(state => state.authenticator.userId);
    const token = useSelector(state => state.authenticator.token);

    const onSubmit = data => {
        const userInfo = {
            username: data.userName,
            companyname: [data.companyName],
            adressStreet: data.adressFirstLine,
            adressLineTwo: data.adressSecondLine,
            adressCity: data.adressThirdLine,
        };

        dispatch(userInfoActions.addUserInfo(userInfo, userId, token));

        props.navigation.goBack();
    };
    return (
        <View style={generalStyles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={generalStyles.container}>
                    <FormTopButtonsComponent onPressCheck={handleSubmit(onSubmit)} />
                    <View>
                        <Text>Quel est votre prénom ?</Text>
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    placeholder="Entrez votre prénom."
                                    value={value}
                                    onChangeText={value => onChange(value)}
                                    multiline={true}
                                />
                            )}
                            name="userName"
                        />
                    </View>
                    <View>
                        <Text>Quel est le nom de votre entreprise ?</Text>
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    placeholder="Nom de votre entreprise."
                                    value={value}
                                    onChangeText={value => onChange(value)}
                                    multiline={true}
                                />
                            )}
                            name="companyName"
                        />
                    </View>
                    <View>
                        <Text>Quel est l'adresse de votre entreprise ?</Text>
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    placeholder="Adresse ligne 1."
                                    value={value}
                                    onChangeText={value => onChange(value)}
                                    multiline={true}
                                />
                            )}
                            name="adressFirstLine"
                        />
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    placeholder="Adresse ligne 2."
                                    value={value}
                                    onChangeText={value => onChange(value)}
                                    multiline={true}
                                />
                            )}
                            name="adressSecondLine"
                        />
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    placeholder="Code postal et nom de ville."
                                    value={value}
                                    onChangeText={value => onChange(value)}
                                    multiline={true}
                                />
                            )}
                            name="adressThirdLine"
                        />
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default UserInfoForm;
