import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import { Button } from 'react-native-paper';

// Connect Components
import ButtonNameIcon from "../../Components/Bottons/ButtonNameIcon";
import Logo from "../../Components/Logo/Logo";
import InfoUserLogin from "../../Components/Footer/InfoUserLogin";
import Bubble from "../../Components/Effects/Bubble"

// Connect Global Styles
import { globalStyles } from "../../Styles/globalStyles";

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
    Alert.alert("Go to Eamil page");
 };

 const handleCreateAccountPhone = () => {
     Alert.alert("Go to Phone page");
 }

 return (
    <View style={[styles.container, globalStyles.globalBackground]}>

       <Logo
          logoName="icon.png"
       ></Logo>

       <ButtonNameIcon
           iconBtn="mail-outline"
           buttonText="Продолжить по email"
           handleCreateAccount={handleCreateAccountEmail}
       ></ButtonNameIcon>

       <ButtonNameIcon
           iconBtn="call-outline"
           buttonText="Продолжить по телефону"
           handleCreateAccount={handleCreateAccountPhone}
       ></ButtonNameIcon>

       <InfoUserLogin navigation={navigation}></InfoUserLogin>

       <Bubble></Bubble>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    padding: 20,
    paddingTop: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: "100%",
  },

});

export default Login;
