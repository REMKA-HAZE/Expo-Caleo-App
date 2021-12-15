import React, { useRef, useState, useEffect } from 'react'
import { ActivityIndicator, View, Alert, KeyboardAvoidingView, Dimensions, Modal } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Modalize } from 'react-native-modalize';
import { urlBack } from '../../environments/environments.url';
import { StyledInput, LogoImage, PressableButton } from '../../screens/Login/Login.styles';
import {
    Container,
    Label,
    ModalContainer,
    ModalView,
    CloseButton,
    DrawerButton,
    DrawerText
} from "./Cars.styles";
import axios from 'axios';
import { ColorPicker, fromHsv } from 'react-native-color-picker'
import { Keyboard } from "react-native";
import i18n from "../../localization/i18n";

export const CarUpdate = ({ user, updateCar, setUpdateCar, getCars }) => {

    const modalizeRef = useRef(null);

    const navigation = useNavigation();

    const [cargando, setCargando] = useState(false)

    const [modalVisible, setModalVisible] = useState(false);

    const [file, setFile] = useState({});

    const [newCar, setNewCar] = useState({
        _id: updateCar._id,
        strMarca: updateCar.strMarca,
        strModelo: updateCar.strModelo,
        strDescripcion: updateCar.strDescripcion,
        nmbAño: updateCar.nmbAño,
        strImg: [],
        strPlacas: updateCar.strPlacas,
        strColor: updateCar.strColor,
        idPersona: user._id,
        idCajon: updateCar.idCajon,
        anteriorCajonId: updateCar.idCajon,
        blnActivo: true
    });

    const onOpen = () => {
        Keyboard.dismiss();
        modalizeRef.current.open();
    };

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
                base64: true
            });

            if (!result.cancelled) {
                let uploadUri = Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri;
                let imageName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
                let match = /\.(\w+)$/.exec(imageName);
                let type = match ? `image/${match[1]}` : `image`;
                await setFile({
                    uri: uploadUri,
                    name: imageName,
                    type
                })

            }
        } catch (error) {
            console.error(error);
            Toast.show(i18n.t("alertProfileErr"), {
                duration: Toast.durations.SHORT,
                position: Toast.positions.TOP,
                containerStyle: { marginTop: 50 },
            });
        }
    };

    const handleInputChange = (field) => {
        setNewCar({
            ...newCar,
            ...field
        });
    }

    const handleAddColor = () => {
        Keyboard.dismiss();
        setModalVisible(!modalVisible);
    }

    const handleUpdate = async (e) => {
        const idAuto = newCar._id;
        e.preventDefault();
        setCargando(true);
        Keyboard.dismiss();
        // console.log(newCar)
        let formData = new FormData();
        formData.append("archivo", file, file.name);
        try {
            await axios.put(`${urlBack}/carga/?ruta=vehiculos&id=${idAuto}`, formData)
                .then((res) => {
                    const arrImg = res.data.usrDB.strImg;
                    const ObjectImg = { strImg: arrImg[arrImg.length - 1] };
                    console.log(ObjectImg);
                    axios.put(`${urlBack}/vehiculo`, { ...newCar, strImg: ObjectImg.strImg }).then(async (response) => {
                        Alert.alert(i18n.t("put"), response.data.msg)
                        console.log(response.data, 'here');
                        setUpdateCar({});
                        await getCars()
                        navigation.navigate("CarsComponent");

                    }).catch((error) => {
                        getCars()
                        console.log(error, 'errorGEN')
                        setCargando(false);
                        Alert.alert(i18n.t("alerErrorCarRegister"), error.response ? error.response.data.msg : i18n.t("alerErrorCarRegister"))
                    })
                }).catch(error => {
                    setCargando(false);
                    console.log(error, 'errorIMG');
                })

        } catch (error) {
            Alert.alert('Error', error.response.data.msg);
        }
    }

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                await ImagePicker.requestCameraPermissionsAsync();

                if (status !== 'granted') {
                    alert(i18n.t("alerErrorCam"));
                }
            }
        })();
    }, []);

    const takePicture = async () => {

        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.cancelled) {
                console.log(result);
                let uploadUri = Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri;
                let imageName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
                try {
                    let match = /\.(\w+)$/.exec(imageName);
                    let type = match ? `image/${match[1]}` : `image`;
                    await setFile({
                        uri: uploadUri,
                        name: imageName,
                        type
                    })

                } catch (error) {
                    console.log(error);
                    Toast.show(i18n.t("alertProfileErr"), {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.TOP,
                        containerStyle: { marginTop: 50 },
                    });
                }
            }
        } catch (error) {
            console.error(error);
            Toast.show(i18n.t("alertProfileErr"), {
                duration: Toast.durations.SHORT,
                position: Toast.positions.TOP,
                containerStyle: { marginTop: 50 },
            });
        }
    }


    return (
        <Container>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, alignItems: "center", marginTop: 5 }}>
                {
                    modalVisible ? (
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <ModalContainer>
                                <ModalView >
                                    <View >
                                        <ColorPicker
                                            onColorChange={(e) => handleInputChange({ strColor: fromHsv({ h: e.h, s: e.s, v: e.v }) })}
                                            style={{ flex: 1, width: 250 }}
                                            defaultColor={newCar.strColor}
                                            hideSliders={false}
                                        />
                                        <CloseButton onPress={() => setModalVisible(!modalVisible)}>
                                            <Label>{i18n.t("cerrar")}</Label>
                                        </CloseButton>
                                    </View>


                                </ModalView>

                            </ModalContainer>
                        </Modal>
                    ) : (
                        <View>
                            <StyledInput
                                placeholder={i18n.t("marca")}
                                value={newCar.strMarca}
                                onChangeText={(text) => handleInputChange({ strMarca: text })}

                            />
                            <StyledInput
                                placeholder={i18n.t("modelo")}
                                value={newCar.strModelo}
                                onChangeText={(text) => handleInputChange({ strModelo: text })}

                            />
                            <StyledInput
                                placeholder={i18n.t("Descripcion")}
                                value={newCar.strDescripcion}
                                onChangeText={(text) => handleInputChange({ strDescripcion: text })}

                            />
                            <StyledInput
                                placeholder={i18n.t("year")}
                                keyboardType="numeric"
                                value={newCar.nmbAño}
                                onChangeText={(text) => handleInputChange({ nmbAño: text })}
                            />
                            <StyledInput
                                placeholder={i18n.t("placas")}
                                value={newCar.strPlacas}
                                onChangeText={(text) => handleInputChange({ strPlacas: text })}
                            />
                            <PressableButton title={i18n.t("putColor")} color="darkorange" bgColor="white" onPress={handleAddColor} />
                            <PressableButton title={i18n.t("img")} color="darkorange" bgColor="white" onPress={onOpen} />
                            <PressableButton title={i18n.t("update")} color="white" bgColor="darkorange" onPress={handleUpdate} />
                        </View>
                    )
                }
            </KeyboardAvoidingView>
            <Modalize ref={modalizeRef} modalHeight={150} >
                <DrawerButton onPress={pickImage}><DrawerText><Ionicons name="cloud-upload-outline" size={30} color='black' />{i18n.t("uploadimage")}</DrawerText></DrawerButton>
                <DrawerButton onPress={takePicture}><DrawerText><Ionicons name="camera-outline" size={30} color='black' />{i18n.t("takephoto")}</DrawerText></DrawerButton>
            </Modalize>
        </Container>
    )
}
