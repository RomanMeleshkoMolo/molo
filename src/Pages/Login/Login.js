/**
 * © [2025] Molo. All rights reserved.
 * Molo is a private development, and all rights are owned by the app's owner.
 */

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

// Connect Components
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
import Logo from "Components/Logo/Logo";
import InfoUserLogin from "Components/Footer/InfoUserLogin";
import Bubble from "Components/Effects/Bubble"
import GoogleSignInButton from "Components/Buttons/GoogleSignInButton";

// Connect styles
import styles from "LoginStyles/Login.scss";

const Login = ({ navigation }) => {
 const [login, setLogin] = useState('');
 const [password, setPassword] = useState('');


 const goToPhoneTest = () => {
     navigation.navigate('MainNavi');
 }

 const goToPhone = () => {
    navigation.reset({
         index: 0,
         routes: [{ name: 'MainNavi' }],
    })
 }


 const handleCreateAccountEmail = () => {
     navigation.navigate('LoginEmail');
 };

 const handleCreateAccountPhone = () => {
     navigation.navigate('LoginPhone');
 }

 const handleCreateAccountTelegram = () => {
     navigation.navigate('VerificationTelegram');
 }

 return (
    <View style={[styles.container]}>

       <Logo
          logoName="icon.png"
       ></Logo>

       <ButtonNameIcon
           leftIcon="true"
           iconBtn="mail-outline"
           disable={false}
           buttonText="Продолжить по email"
           handle={handleCreateAccountEmail}
       ></ButtonNameIcon>

       <ButtonNameIcon
           leftIcon="true"
           iconBtn="call-outline"
           disable={false}
           buttonText="Продолжить по телефону"
           handle={handleCreateAccountPhone}
       ></ButtonNameIcon>

       <ButtonNameIcon
         leftIcon="true"
         iconBtn="paper-plane-outline"
         // disable={false}
         buttonText="Продолжить c Telegram"
         handle={handleCreateAccountTelegram}
       ></ButtonNameIcon>

       <GoogleSignInButton></GoogleSignInButton>

       <InfoUserLogin navigation={navigation}></InfoUserLogin>

       <Bubble></Bubble>

    </View>
  );
};

export default Login;
