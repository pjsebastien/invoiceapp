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
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import generalStyles from '../styles/general/generalStyles';
import formStyles from '../styles/general/formsStyles';
import FormTopButtonsComponent from '../components/ButtonsComponents/FormTopButtonsComponent';
import { useDispatch, useSelector } from 'react-redux';
import * as userInfoActions from '../store/actions/userInfo';
import AddPictureComponent from '../components/GeneralComponents/AddPictureComponent';
import * as ImagePicker from 'expo-image-picker';
import accountStyles from '../styles/account/accountStyles';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import Colors from '../theme/colors';

const UserInfoForm = props => {
    const [image, setImage] = useState();
    const [imageTemp, setImageTemp] = useState();
    const [downloading, setDownloading] = useState(null);

    const dispatch = useDispatch();
    const userId = useSelector(state => state.authenticator.userId);
    const token = useSelector(state => state.authenticator.token);
    const fetchedUserInfo = useSelector(state => state.app.userInfo);

    useEffect(() => {
        dispatch(userInfoActions.getUserInfo(userId));
    }, []);

    console.log(fetchedUserInfo);

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

    const onSubmit = data => {
        let image64;

        // if (image) {
        //     const uriParts = image.uri.split('.');
        //     const fileType = uriParts[uriParts.length - 1];
        //     image64 = `data:image/${fileType};base64,${image.base64}`;
        // }
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
        };

        dispatch(userInfoActions.addUserInfo(userInfo, userId));
        // dispatch(userInfoActions.getUserInfo(userId));

        Alert.alert('Merci,', 'Vos changements on étés pris en compte.');
        props.navigation.navigate('drawerAccount');
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
                        <FormTopButtonsComponent onPressCheck={handleSubmit(onSubmit)} />
                        <View style={formStyles.logoPicker}>
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

                            <Text style={formStyles.formLabelText}>
                                Ajouter votre logo
                            </Text>
                        </View>
                        <Text style={accountStyles.titleInfo}>Coordonnées :</Text>
                        <View style={formStyles.formContainer}>
                            <Text style={formStyles.formLabelText}>Votre prénom :</Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={formStyles.formInput}
                                        placeholder={'Prénom'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="userName"
                            />

                            <Text style={formStyles.formLabelText}>Votre nom :</Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={formStyles.formInput}
                                        placeholder={'Nom de famille'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="familyName"
                            />

                            <Text style={formStyles.formLabelText}>
                                Nom de votre entreprise :
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={formStyles.formInput}
                                        placeholder="Nom de votre entreprise."
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="companyName"
                            />

                            <Text style={formStyles.formLabelText}>
                                Adresse de facturation :
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={formStyles.formInputAdress}
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
                                        style={formStyles.formInputAdress}
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
                                        style={formStyles.formInputAdress}
                                        placeholder="Code postal et nom de ville."
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="adressCity"
                            />

                            <Text style={formStyles.formLabelText}>
                                Votre site internet :
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={formStyles.formInput}
                                        placeholder={'URL de votre site'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="webSite"
                            />

                            <Text style={formStyles.formLabelText}>
                                Votre email de contact :
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={formStyles.formInput}
                                        placeholder={'Adresse mail'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="mail"
                            />
                            <Text style={formStyles.formLabelText}>
                                Votre numéro de téléphone mobile :
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={formStyles.formInput}
                                        placeholder={'Numéro de téléphone'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="mobilePhone"
                            />
                            <Text style={formStyles.formLabelText}>
                                Votre numéro de téléphone fixe :
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={formStyles.formInput}
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
                            Détails de l'entreprise :
                        </Text>
                        <View style={formStyles.formContainer}>
                            <Text style={formStyles.formLabelText}>
                                Statut juridique :
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={formStyles.formInput}
                                        placeholder={'Statut juridique'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="statut"
                            />
                            <Text style={formStyles.formLabelText}>Numéro SIRET :</Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={formStyles.formInput}
                                        placeholder={'Numéro SIRET'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="siret"
                            />
                            <Text style={formStyles.formLabelText}>Numéro RCS :</Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={formStyles.formInput}
                                        placeholder={'Numéro RCS'}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        multiline={true}
                                    />
                                )}
                                name="rcs"
                            />
                            <Text style={formStyles.formLabelText}>
                                Numéro TVA (ne pas remplir si exempté) :
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={formStyles.formInput}
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
                    </SafeAreaView>
                </ScrollView>
            )}
        </View>
    );
};

export default UserInfoForm;
