import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import Colors from '../../theme/colors';
import appTheme from '../../theme/fonts';

const SignInScroll = ({ onOK }) => {
    const [signature, setSign] = useState(null);
    const [instruction, setInstruction] = useState('Signez le document');
    const ref = useRef();
    const handleOK = signature => {
        setSign(signature);
        onOK(signature); // Callback from Component props
    };

    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
        setSign(null);
        console.log('Empty');
        setInstruction('Signature non remplie !');
    };

    // Called after ref.current.clearSignature()
    const handleClear = () => {
        console.log('clear success!');
        setSign(null);
        setInstruction('Signez le document !');
    };

    // Called after end of stroke
    const handleEnd = () => {
        ref.current.readSignature();
    };

    // Called after ref.current.getData()
    const handleData = data => {
        setInstruction('Signature sauvegardée !');
    };

    return (
        <>
            <View style={styles.preview}>
                {signature ? (
                    <>
                        <Text style={styles.signText}>Aperçu :</Text>
                        <Image
                            resizeMode={'contain'}
                            style={{ width: 335, height: 114 }}
                            source={{ uri: signature }}
                        />
                    </>
                ) : null}
            </View>
            <View
                style={{
                    width: Dimensions.get('window').width - 30,
                    marginBottom: appTheme.Size.size12,
                }}
            >
                <Text style={styles.signText}>{instruction}</Text>
            </View>
            <View
                style={{
                    width: Dimensions.get('window').width - 30,
                    height: 350,
                }}
            >
                <SignatureScreen
                    ref={ref}
                    onEnd={handleEnd}
                    onOK={handleOK}
                    onEmpty={handleEmpty}
                    onClear={handleClear}
                    onGetData={handleData}
                    clearText="Recommencer"
                    confirmText="Confirmer"
                    descriptionText={''}
                    webStyle={style}
                />
            </View>
        </>
    );
};

export default SignInScroll;

const style = `.m-signature-pad--footer
    .button {
      background-color: ${Colors.primary};
      color: #FFF;
      width: 50%;
      margin: 5px
    }`;

const styles = StyleSheet.create({
    preview: {
        width: Dimensions.get('window').width - 30,
        height: 114,
        backgroundColor: Colors.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    previewText: {
        color: Colors.textPrimary,
        fontSize: 14,
        height: 40,
        lineHeight: 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#69B2FF',
        width: 140,
        textAlign: 'center',
        marginTop: 10,
    },
    signText: {
        fontFamily: 'Orkney-bold',
        textAlign: 'center',
        fontSize: appTheme.Size.size16,
        color: Colors.textPrimary,
    },
});
