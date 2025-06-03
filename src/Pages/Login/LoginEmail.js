/**
 * © [2025] Molo. All rights reserved.
 * Molo is a private development, and all rights are owned by the app's owner.
 */

import React, { useRef } from 'react';
import { View } from 'react-native';

// Connect components
import GoBackButton from "../../Components/Bottons/GoBackButton";
import Title from "../../Components/Titles/Title";
import SubTitle from "../../Components/Titles/SubTitle";
import ButtonNameIcon from "../../Components/Bottons/ButtonNameIcon";
import TitleWithIcon from "../../Components/Titles/TitleWithIcon";
import InputEmail from "../../Components/Inputs/InputEmail";

// Connect Global Styles
import style from "./styles/LoginEmail.scss";

const LoginEmail = ({ navigation }) => {
  const [text, setText] = React.useState('');
  const [isEmailValid, setIsEmailValid] = React.useState(false);

  const goBack = () => {
       navigation.navigate('LoginPhone');
  }

  const handleValidEmail = ( isValid ) => {
      setIsEmailValid(isValid);
  };

  const goToVerification = () => {
      alert("goooooo!!");
  };



  return (
     <View style={[style.container]}>

        <View style={style.header}>
            <GoBackButton
              navigation={navigation}
            ></GoBackButton>
        </View>

        <Title>Супер! Укажи свой email для подтвержения аккаунта</Title>
        <SubTitle>Это необходимо для подтверждения твоего аккаунта</SubTitle>

        <InputEmail
            style={[style.input]}
            value={text}
            onValidEmail={handleValidEmail}
        ></InputEmail>

        <ButtonNameIcon
              buttonText="Регистрация по телефону"
              handle={goBack}
        ></ButtonNameIcon>

        <View style={style.footer}>
           <TitleWithIcon
              nameIcon="lock-closed-outline"
           >
               Мы никому не будем передавать твой email. Ваша безопасность превыше всего!
           </TitleWithIcon>

           <ButtonNameIcon
              buttonText="Дальше"
              handle={goToVerification}
              disable={!isEmailValid}
           ></ButtonNameIcon>
        </View>

     </View>
  );
};

export default LoginEmail;
