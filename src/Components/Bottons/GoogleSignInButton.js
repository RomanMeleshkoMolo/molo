import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";

const GoogleSignInButton = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '401056033169-rs9cfjkp4adtoi1urefk3rvq0vug2qk4.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log(userInfo);

      Alert.alert('Success', `Welcome ${userInfo.data.user.name}`);
      // Обработайте userInfo и зарегистрируйте в вашем приложении
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelled', 'User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('In Progress', 'Sign in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Play services not available');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
     <View>

        <ButtonNameIcon
           leftIcon="true"
           iconBtn="logo-google"
           // disable={false}
           buttonText="Продолжить c Google"
           handle={signIn}
        ></ButtonNameIcon>

     </View>
  );
};

export default GoogleSignInButton;
