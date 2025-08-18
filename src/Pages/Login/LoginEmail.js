import React, { useState } from 'react';
import { View, Alert, ActivityIndicator, Platform } from 'react-native';

// Connect components
import GoBackButton from "Components/Buttons/GoBackButton";

import Title from "Components/Titles/Title";
import SubTitle from "Components/Titles/SubTitle";
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
import TitleWithIcon from "Components/Titles/TitleWithIcon";
import InputEmail from "Components/Inputs/InputEmail";
import ModalInfo from "Components/Modals/ModalInfo";

// Connect Global Styles
import style from "LoginStyles/LoginEmail.scss";
import styles from "LoginStyles/LoginPhone.scss";
// import {setUserData} from "redux/actions";

// Connect Store redux
import { useDispatch } from 'react-redux';
import { setUserData } from 'redux/actions';

const LoginEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState('');
  const [errorUserCode, setErrorUserCode] = useState(false);

  const dispatch = useDispatch();

  const goBack = () => {
    navigation.navigate('VerificationTelegram');
  };

  const handleValidEmail = (isValid) => {
    setIsEmailValid(isValid);
  };

  const goToVerification = async () => {
    if (!isEmailValid) {
      Alert.alert("Введите действительный email.");
      return;
    }

    setLoading(true);

    try {
      console.log('Email:', email);

      const apiUrl = Platform.OS === 'ios'
           ? 'http://localhost:3000/register-email'
           : 'http://192.168.0.107:3000/register-email';


      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      console.log('Response Status:', response.status);

      if ( response.ok ) {

        const user = await response.json();

        // Save to store
        dispatch( setUserData( user ) );

        const { confirmationCode, email } = user;

        // Возможно, навигация на следующий экран
        navigation.navigate('VerificationEmail', { confirmationCode, email });
      } else {

        setErrorUserCode(true);
        setInfo('Ошибка отправки. Попробуйте снова.');

      }
    } catch (error) {

       setErrorUserCode(true);
       setInfo('Ошибка сети. Попробуйте снова.');

    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[style.container]}>

      <View style={styles.header}>
        <GoBackButton navigation={navigation} />
      </View>

      <Title>Супер!!! Укажи свой email для подтвержения аккаунта</Title>
      <SubTitle>Это необходимо для подтверждения твоего аккаунта</SubTitle>

      <InputEmail
        value={email}
        onChangeText={setEmail}
        onValidEmail={handleValidEmail}
      />

      <ButtonNameIcon
        buttonText="Регистрация по Telegram"
        handle={goBack}
      />

      <View style={style.footer}>
        <TitleWithIcon nameIcon="lock-closed-outline">
          Мы никому не будем передавать твой email. Ваша безопасность превыше всего!
        </TitleWithIcon>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ButtonNameIcon
            buttonText="Дальше"
            handle={goToVerification}
            disable={!isEmailValid}
          />
        )}
      </View>

       {errorUserCode && (
          <ModalInfo
             message={ info }
             backgroundColor={'#ffcc00'}
             textColor="#000"
             onHide={() => setErrorUserCode(false)}
          />
       )}

    </View>
  );
};

export default LoginEmail;
