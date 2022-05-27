import {
    TouchableOpacity,
    Text,
    View,
    Platform,
    Alert,
    ActivityIndicator,
    Image,
} from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
    deleteObject,
} from 'firebase/storage';
import formsStyles from '../../styles/general/formsStyles';
import AttachmentButtonComponent from '../ButtonsComponents/AttachmentButtonComponent';
import Colors from '../../theme/colors';
import BinButtonComponent from '../ButtonsComponents/BinButtonComponent';

const AttachmentsComponent = ({ addAttachmentsToInvoice, userId }) => {
    const url = '';
    const [image, setImage] = useState(null);
    const [imageTemp, setImageTemp] = useState();
    const [downloading, setDownloading] = useState(null);
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
            // aspect: [1, 1],
        });

        if (result.cancelled) {
            Alert.alert('Image non sélectionnée', 'Vous avez annulé la sélection.');
            // setImage();
        } else {
            const storage = getStorage();
            const storageRef = ref(storage, userId + ' : attachment'); //ajouter invoiceID
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
                        // setImage([...image, downloadURL]);
                        setImage(downloadURL);
                        addAttachmentsToInvoice(downloadURL);
                    });
                },
            );
        }
    };

    const deleteAttachment = () => {
        const storage = getStorage();
        const deleteRef = ref(storage, userId + ' : attachment'); //ajouter invoiceID
        deleteObject(deleteRef)
            .then(() => {
                setImage(null);
                addAttachmentsToInvoice(null);
            })
            .catch(error => {
                console.log(error);
            });
    };
    return (
        <View>
            <Text style={formsStyles.formLabelText}>Pièce jointe :</Text>
            {downloading !== null && downloading < 100 ? (
                <ActivityIndicator
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                        marginVertical: 10,
                    }}
                    size="large"
                    color={Colors.primary}
                />
            ) : image === null ? (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onPressPickerHandler()}
                    style={formsStyles.selectProductContainer}
                >
                    <Text style={formsStyles.selectProductText}>
                        Sélectionner une pièce jointe
                    </Text>
                    <AttachmentButtonComponent />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    activeOpacity={0.8}
                    // onPress={() => deleteAttachment()}
                    style={formsStyles.selectProductContainer}
                >
                    <Text style={formsStyles.selectProductText}>
                        Supprimer la pièce jointe
                    </Text>
                    <BinButtonComponent onPress={() => deleteAttachment()} />
                </TouchableOpacity>
            )}
            {image != null ? (
                <View style={formsStyles.attachmentPreview}>
                    <Image style={formsStyles.attachmentImage} source={{ uri: image }} />
                </View>
            ) : null}
        </View>
    );
};

export default AttachmentsComponent;
