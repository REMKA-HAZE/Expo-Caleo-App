import React, { useState } from 'react';
import { ActivityIndicator, View, Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { StyledInput, LogoImage, PressableButton } from '../Login/Login.styles';
import { RegistroService } from '../../services/Auth/RegistroService';
import i18n from "../../localization/i18n"
export const Registro = () => {

    const navigation = useNavigation();

    const [cargando, setCargando] = useState(false);


    const [usuario, setUsuario] = useState({
        strNombre: '',
        strPrimerApellido: '',
        strSegundoApellido: '',
        strCorreo: '',
        strContrasena: '',
        strPais: 'MX',
        strEstado: 'Aguascalientes',
        idEstado: '',
        nmbTelefono: null,
        strDireccion: ''
    });

    const handleInputChange = (field) => {
        setUsuario({
            ...usuario,
            ...field
        });
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setCargando(true);

        try {
            console.log(usuario);
            await RegistroService(usuario).then((response) => {
                Alert.alert(i18n.t("alerRegistro"), response.data.msg)
                setCargando(false);
                navigation.replace("Login");
                setUsuario({
                    strNombre: '',
                    strPrimerApellido: '',
                    strSegundoApellido: '',
                    strCorreo: '',
                    strContrasena: '',
                    strPais: 'MX',
                    strEstado: 'Aguascalientes',
                    idEstado: '',
                    nmbTelefono: null,
                    strDireccion: ''
                });
            })
                .catch((error) => {
                    console.log(error.response);
                    setCargando(false);
                    Alert.alert(i18n.t("alerError"), error.response ? error.response.data.msg : i18n.t("alertErrorUsuario"))
                })

        } catch (error) {
            Alert.alert('Error', error.response.data.msg);
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

            <LogoImage source={require('../../assets/caleoLogo.png')} />

            {
                cargando ?
                    <View >
                        <ActivityIndicator size="large" color="#e98425" />
                    </View>
                    :
                    <View>
                        <StyledInput
                            placeholder={i18n.t("name")}
                            value={usuario.strNombre}
                            onChangeText={(text) => handleInputChange({ strNombre: text })}

                        />
                        <StyledInput
                            placeholder={i18n.t("primerApellido")}
                            value={usuario.strPrimerApellido}
                            onChangeText={(text) => handleInputChange({ strPrimerApellido: text })}

                        />
                        <StyledInput
                            placeholder={i18n.t("segundoApellido")}
                            value={usuario.strSegundoApellido}
                            onChangeText={(text) => handleInputChange({ strSegundoApellido: text })}

                        />
                        <StyledInput
                            placeholder={i18n.t("telefono")}
                            keyboardType="numeric"
                            value={usuario.nmbTelefono}
                            onChangeText={(text) => handleInputChange({ nmbTelefono: text })}

                        />
                        <StyledInput
                            placeholder={i18n.t("direccion")}
                            value={usuario.strDireccion}
                            onChangeText={(text) => handleInputChange({ strDireccion: text })}

                        />
                        <StyledInput
                            placeholder={i18n.t("email")}
                            value={usuario.strCorreo}
                            onChangeText={(text) => handleInputChange({ strCorreo: text })}

                        />
                        <StyledInput
                            placeholder={i18n.t("password")}
                            secureTextEntry={true}
                            value={usuario.strContrasena}
                            onChangeText={(text) => handleInputChange({ strContrasena: text })}
                        />

                        <PressableButton title={i18n.t("register")} color="darkorange" bgColor="white" onPress={handleRegister} />

                    </View>
            }

        </KeyboardAvoidingView>
    );
}


