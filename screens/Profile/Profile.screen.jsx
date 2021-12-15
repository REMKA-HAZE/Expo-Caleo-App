import React, { useRef, useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/core";
import { InfoContainer, Header, AccountImage, LogoutButton, TextButton, DrawerText, DrawerButton } from '../Profile/Profile.styles';
import { TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { urlBack } from '../../environments/environments.url';
import axios from 'axios';
import i18n from "../../localization/i18n"
export const Profile = ({ user }) => {
  const modalizeRef = useRef(null);
  const navigation = useNavigation();
  const [userImage, setUserImage] = useState('')
  const [image, setImage] = useState('');

  const handleSignOut = () => {
    navigation.replace("Login");
    AsyncStorage.removeItem('authorization');
  };
  const onOpen = () => {
    modalizeRef.current.open();
  };
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
          alert(i18n.t("alertProfileCam"));
        }
      }
      console.log(user)
      setUserImage(`${urlBack}/imagen?ruta=personas&img=${user.strImg}`)
    })();
  }, []);

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
        await uploadPhoto({
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
  const takePicture = async () => {

    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        let uploadUri = Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri;
        let imageName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        try {
          let match = /\.(\w+)$/.exec(imageName);
          let type = match ? `image/${match[1]}` : `image`;
          await uploadPhoto({
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
      Toast.show(i18n.t("alertProfileErr"), {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        containerStyle: { marginTop: 50 },
      });
    }
  }


  const uploadPhoto = async (img) => {
    let formData = new FormData();
    formData.append("archivo", img, img.name);
    axios.put(`${urlBack}/carga/?ruta=personas&id=${user._id}`, formData)
      .then(res => {
        Toast.show(i18n.t("alertProfilerImag"), {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          containerStyle: { marginTop: 50 },
        });
        setUserImage(img.uri);
        console.log(res);
      }).catch(err => {
        console.log(err.response);
        Toast.show(i18n.t("alertProfileErr"), {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          containerStyle: { marginTop: 50 },
        });
      })
  };

  return (

    <InfoContainer>
      <TouchableOpacity onPress={onOpen}>
        <AccountImage source={{ uri: userImage }} />
      </TouchableOpacity>
      <Header><Ionicons name="person" size={19} /> {user.strNombre} {user.strPrimerApellido} {user.strSegundoApellido} </Header>
      <Header><Ionicons name="mail" size={19} /> {user.strCorreo}</Header>
      <Header><Ionicons name="call" size={19} /> {user.nmbTelefono}</Header>
      <Header><Ionicons name="home" size={19} /> {user.strDireccion}, {user.strEstado}, {user.strPais}</Header>
      <LogoutButton onPress={handleSignOut}>
        <TextButton>{i18n.t("signout")}</TextButton>
      </LogoutButton>
      <Modalize ref={modalizeRef} modalHeight={150} >

        <DrawerButton onPress={pickImage}><DrawerText><Ionicons name="cloud-upload-outline" size={30} color='black' />{i18n.t("uploadimage")}</DrawerText></DrawerButton>
        <DrawerButton onPress={takePicture}><DrawerText><Ionicons name="camera-outline" size={30} color='black' />{i18n.t("takephoto")}</DrawerText></DrawerButton>


      </Modalize>
    </InfoContainer>


  );
};





