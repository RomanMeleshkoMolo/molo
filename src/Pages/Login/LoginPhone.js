/**
 * © [2025] Molo. All rights reserved.
 * Molo is a private development, and all rights are owned by the app's owner.
 */

import React from 'react';
import { View } from 'react-native';

// Connect components
import GoBackButton from "../../Components/Bottons/GoBackButton";
import Title from "../../Components/Titles/Title";
import SubTitle from "../../Components/Titles/SubTitle";
import ButtonNameIcon from "../../Components/Bottons/ButtonNameIcon";
import TitleWithIcon from "../../Components/Titles/TitleWithIcon";
import InputPhone from "../../Components/Inputs/InputPhone";

import style from "./styles/LoginPhone.scss";

const LoginPhone = ({ navigation }) => {
  const [text, setText] = React.useState('');
  const [isPhoneValid, setIsPhoneValid] = React.useState(false);

  const goToVerification = () => {
       navigation.navigate('LoginEmail');
  }

  const handlePhoneNumber = ( isValid ) => {
      setIsPhoneValid(isValid);
  };

  return (
     <View style={[style.container]}>

        <View style={style.header}>
            <GoBackButton
               navigation={navigation}
            ></GoBackButton>
        </View>

        <Title>Отлично! Укажи свой номер телефона</Title>
        <SubTitle>Мы отправим на него код подтверждения</SubTitle>

        <InputPhone
           style={[style.input]}
            onPhoneNumber={handlePhoneNumber}
        ></InputPhone>

        <ButtonNameIcon
              buttonText="Регистрация по email"
              handle={goToVerification}
        ></ButtonNameIcon>

        <View style={style.footer}>
           <TitleWithIcon
              nameIcon="lock-closed-outline"
           >
               Твой номер телефона никто не увидет в профиле!Будьте спокойны;)
           </TitleWithIcon>

           <ButtonNameIcon
              buttonText="Дальше"
              disable={!isPhoneValid}
           ></ButtonNameIcon>
        </View>

     </View>
  );
};

export default LoginPhone;
