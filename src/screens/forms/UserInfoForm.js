import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    TextInput,
    Platform,
    Alert,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Pressable,
    BackHandler,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import generalStyles from '../../styles/general/generalStyles';
import formsStyles from '../../styles/general/formsStyles';
import FormTopButtonsComponent from '../../components/ButtonsComponents/FormTopButtonsComponent';
import { useDispatch, useSelector } from 'react-redux';
import * as userInfoActions from '../../store/actions/userInfo';
import AddPictureComponent from '../../components/GeneralComponents/AddPictureComponent';
import * as ImagePicker from 'expo-image-picker';
import accountStyles from '../../styles/account/accountStyles';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import Colors from '../../theme/colors';
import SignComponent from '../../components/ProfileComponents/SignComponent';
import buttonsStyles from '../../styles/general/buttonsStyles';
import { useFocusEffect } from '@react-navigation/native';
import SaveButtonComponent from '../../components/ButtonsComponents/SaveButtonComponent';

const UserInfoForm = props => {
    const [image, setImage] = useState();
    const [imageTemp, setImageTemp] = useState();
    const [downloading, setDownloading] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [sign, setSign] = useState();
    const [onFocusInput, setOnFocusInput] = useState(null);

    const dispatch = useDispatch();
    const userId = useSelector(state => state.authenticator.userId);
    const token = useSelector(state => state.authenticator.token);
    const fetchedUserInfo = useSelector(state => state.app.userInfo);

    useEffect(() => {
        dispatch(userInfoActions.getUserInfo(userId));
        preventBackButtonHandling();
    }, []);

    useFocusEffect(
        useCallback(() => {
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onPressArrowBack);
            };
        }, []),
    );

    useEffect(() => {
        if (fetchedUserInfo) {
            setValue('userName', fetchedUserInfo.userName);
            setValue('familyName', fetchedUserInfo.familyName);
            setValue('adressCity', fetchedUserInfo.adressCity);
            setValue('adressLineTwo', fetchedUserInfo.adressLineTwo);
            setValue('adressStreet', fetchedUserInfo.adressStreet);
            setValue('companyName', fetchedUserInfo.companyName);
            setValue('webSite', fetchedUserInfo.webSite);
            setValue('mail', fetchedUserInfo.mail);
            setValue('mobilePhone', fetchedUserInfo.mobilePhone);
            setValue('fixPhone', fetchedUserInfo.fixPhone);
            setValue('statut', fetchedUserInfo.statut);
            setValue('siret', fetchedUserInfo.siret);
            setValue('rcs', fetchedUserInfo.rcs);
            setValue('tvaNumber', fetchedUserInfo.tvaNumber);
        }
    }, [fetchedUserInfo]);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const preventBackButtonHandling = () => {
        BackHandler.addEventListener('hardwareBackPress', onPressArrowBack);
        return true;
    };

    const onSubmit = data => {
        const userInfo = {
            logo: image ? image : fetchedUserInfo.logo,
            userName: data.userName ? data.userName : '',
            familyName: data.familyName ? data.familyName : '',
            companyName: data.companyName ? data.companyName : '',
            adressStreet: data.adressStreet ? data.adressStreet : '',
            adressLineTwo: data.adressLineTwo ? data.adressLineTwo : '',
            adressCity: data.adressCity ? data.adressCity : '',
            webSite: data.webSite ? data.webSite : '',
            mail: data.mail ? data.mail : '',
            mobilePhone: data.mobilePhone ? data.mobilePhone : '',
            fixPhone: data.fixPhone ? data.fixPhone : '',
            statut: data.statut ? data.statut : '',
            siret: data.siret ? data.siret : '',
            rcs: data.rcs ? data.rcs : '',
            tvaNumber: data.tvaNumber ? data.tvaNumber : '',
            signImage: sign ? sign : fetchedUserInfo.signImage,
        };

        dispatch(userInfoActions.addUserInfo(userInfo, userId));

        Alert.alert('Merci,', 'Vos changements on étés pris en compte.');
        props.navigation.navigate('drawerAccount');
    };

    const onPressArrowBack = () => {
        Alert.alert('Quitter sans sauvegarder ?', '', [
            {
                text: 'Sauvegarder',
                onPress: handleSubmit(onSubmit),
                style: 'default',
            },
            {
                text: 'Annuler',
                onPress: preventBackButtonHandling,
                style: 'default',
            },
            {
                text: 'OK',
                onPress: () => props.navigation.goBack(),
                style: 'cancel',
            },
        ]);

        return true;
    };

    const onOk = signature => {
        setSign(signature);
    };

    const onPressPickerHandler = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission refusée',
                    "Vous n'avez pas accordé l'accès à vos photos, vous pouvez le modifier dans vos paramètres",
                );
            }
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
            aspect: [1, 1],
        });

        if (result.cancelled) {
            Alert.alert('Image non sélectionnée', 'Vous avez annulé la sélection.');
            // setImage();
        } else {
            const storage = getStorage();
            const storageRef = ref(storage, userId);
            const img = await fetch(result.uri);
            const bytes = await img.blob();
            const uploadTask = uploadBytesResumable(storageRef, bytes);

            uploadTask.on(
                'state_changed',
                snapshot => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setDownloading(progress);

                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                error => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                        setImage(downloadURL);
                        setImageTemp(downloadURL);
                    });
                },
            );
        }
    };

    return (
        <View style={generalStyles.mainContainer}>
            {downloading !== null && downloading < 100 ? (
                <ActivityIndicator
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                    }}
                    size="large"
                    color={Colors.primary}
                />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SafeAreaView style={generalStyles.container}>
                        <FormTopButtonsComponent
                            onPressCheck={handleSubmit(onSubmit)}
                            onPressArrowBack={() => onPressArrowBack()}
                        />
                        <View style={formsStyles.logoPicker}>
                            {image ? (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={onPressPickerHandler}
                                >
                                    <Image
                                        style={accountStyles.headerLogoImage}
                                        source={{ uri: imageTemp }}
                                    />
                                </TouchableOpacity>
                            ) : fetchedUserInfo.logo ? (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={onPressPickerHandler}
                                >
                                    <Image
                                        style={accountStyles.headerLogoImage}
                                        source={{ uri: fetchedUserInfo.logo }}
                                    />
                                </TouchableOpacity>
                            ) : (
                                <AddPictureComponent onPress={onPressPickerHandler} />
                            )}

                            <Text style={formsStyles.formLabelText}>
                                Ajouter votre logo
                            </Text>
                        </View>
                        <Text style={accountStyles.titleInfo}>
                            Modifier coordonnées :
                        </Text>
                        <View style={formsStyles.formContainer}>
                            <Text style={formsStyles.formLabelText}>Votre prénom :</Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'userName'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('userName')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder={'Prénom'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="userName"
                            />

                            <Text style={formsStyles.formLabelText}>Votre nom :</Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'familyName'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('familyName')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder={'Nom de famille'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="familyName"
                            />

                            <Text style={formsStyles.formLabelText}>
                                Nom de votre entreprise :
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'companyName'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('companyName')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder="Nom de votre entreprise."
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="companyName"
                            />

                            <Text style={formsStyles.formLabelText}>
                                Adresse de facturation :
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'adressStreet'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('adressStreet')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder="Adresse ligne 1."
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="adressStreet"
                            />
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'adressLineTwo'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('adressLineTwo')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder="Adresse ligne 2."
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="adressLineTwo"
                            />
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'adressCity'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('adressCity')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder="Code postal et nom de ville."
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="adressCity"
                            />

                            <Text style={formsStyles.formLabelText}>
                                Votre site internet :
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'webSite'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('webSite')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder={'URL de votre site'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="webSite"
                            />

                            <Text style={formsStyles.formLabelText}>
                                Votre email de contact :
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'mail'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('mail')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder={'Adresse mail'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                        keyboardType="email-address"
                                    />
                                )}
                                name="mail"
                            />
                            <Text style={formsStyles.formLabelText}>
                                Votre numéro de téléphone mobile :
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'mobilePhone'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('mobilePhone')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder={'Numéro de téléphone'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                        keyboardType="numeric"
                                    />
                                )}
                                name="mobilePhone"
                            />
                            <Text style={formsStyles.formLabelText}>
                                Votre numéro de téléphone fixe :
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'fixPhone'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('fixPhone')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder={'Numéro de téléphone'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="fixPhone"
                            />
                        </View>
                        <Text style={accountStyles.titleInfo}>
                            Modifier détails de l'entreprise :
                        </Text>
                        <View style={formsStyles.formContainer}>
                            <Text style={formsStyles.formLabelText}>
                                Statut juridique :
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'statut'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('statut')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder={'Statut juridique'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="statut"
                            />
                            <Text style={formsStyles.formLabelText}>Numéro SIRET :</Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'siret'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('siret')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder={'Numéro SIRET'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="siret"
                            />
                            <Text style={formsStyles.formLabelText}>Numéro RCS :</Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'rcs'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('rcs')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder={'Numéro RCS'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="rcs"
                            />
                            <Text style={formsStyles.formLabelText}>
                                Numéro TVA (ne pas remplir si exempté) :
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={
                                            onFocusInput === 'tvaNumber'
                                                ? formsStyles.formBorderBottomFocused
                                                : formsStyles.formInput
                                        }
                                        onFocus={() => setOnFocusInput('tvaNumber')}
                                        onBlur={() => setOnFocusInput('')}
                                        placeholder={'Numéro TVA'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="tvaNumber"
                            />
                        </View>
                        <Text style={accountStyles.titleInfo}>
                            Signature electronique :
                        </Text>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                        >
                            <View style={generalStyles.modalContainer}>
                                <View>
                                    <SignComponent onOK={onOk} />
                                </View>
                                <View style={accountStyles.buttonModalContainer}>
                                    <Pressable
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={buttonsStyles.buttonThirdColor}>
                                            Retour
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setModalVisible(true)}
                        >
                            {fetchedUserInfo.signImage || sign ? (
                                <Image
                                    resizeMode={'contain'}
                                    style={accountStyles.imageSign64}
                                    source={{
                                        uri: sign ? sign : fetchedUserInfo.signImage,
                                    }}
                                />
                            ) : (
                                <View
                                    style={{
                                        ...accountStyles.imageSign64,
                                        ...accountStyles.imageSign64Void,
                                    }}
                                >
                                    <Text>Cliquez ici pour signer</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        <SaveButtonComponent onPress={handleSubmit(onSubmit)} />
                    </SafeAreaView>
                </ScrollView>
            )}
        </View>
    );
};

export default UserInfoForm;
