import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// Connect Components
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";

// Connect Navigation
import { useNavigation } from '@react-navigation/native';

// Connect .ENV
import { WEB_CLIENT_ID } from '@env';

// Connect AsyncStorage for check Tokens
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoogleSignInButton = () => {
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
       webClientId: WEB_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log(userInfo);

      // await AsyncStorage.setItem('userGoogleToken', userInfo.data.idToken);
      await AsyncStorage.setItem('registrationUserGoogleState', 'true');


      // Alert.alert('Success', `Welcome ${userInfo.data.user.name}`);
      // Обработайте userInfo и зарегистрируйте в вашем приложении

      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginUserName' }],
      });

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
