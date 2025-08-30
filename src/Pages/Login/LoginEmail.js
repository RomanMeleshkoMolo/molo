import React, { useState } from 'react';
import { View, Alert, ActivityIndicator, Platform } from 'react-native';

// Connect components
import GoBackButton from 'Components/Buttons/GoBackButton';
import Title from 'Components/Titles/Title';
import SubTitle from 'Components/Titles/SubTitle';
import ButtonNameIcon from 'Components/Buttons/ButtonNameIcon';
import TitleWithIcon from 'Components/Titles/TitleWithIcon';
import InputEmail from 'Components/Inputs/InputEmail';
import ModalInfo from 'Components/Modals/ModalInfo';

// Connect Global Styles
import style from 'LoginStyles/LoginEmail.scss';
import styles from 'LoginStyles/LoginPhone.scss';

// Connect Store redux
import { useDispatch } from 'react-redux';
import { setUserData } from 'redux/actions';

const getBaseUrl = () => {

   if (Platform.OS === 'ios') return 'http://localhost:3000';
   // return 'http://10.0.2.2:3000'; // Android эмулятор
   return 'http://192.168.0.107:3000'; // реальное устройство

};

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

  const handleSuccess = (body) => {
    const { confirmationCode, email: returnedEmail, ...rest } = body || {};
    dispatch(setUserData({ email: returnedEmail, ...rest }));

    navigation.navigate('VerificationEmail', {
      confirmationCode,
      email: returnedEmail,
    });
  };

  const goToVerification = async () => {

    if (!isEmailValid) {
      Alert.alert('Введите действительный email.');
      return;
    }

    setLoading(true);

    try {
      const base = getBaseUrl();
      const apiUrl = `${base}/register-email`;

      console.log( "apiUrl - " + apiUrl );

      // Публичный запрос — без Authorization
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 409) {
          setErrorUserCode(true);
          setInfo('Этот email уже используется другим пользователем.');
          return;
        }
        if (res.status === 400) {
          setErrorUserCode(true);
          setInfo(body?.message || 'Некорректные данные. Проверьте email.');
          return;
        }
        if (res.status === 401) {
          setErrorUserCode(true);
          setInfo('Этот шаг регистрации не должен требовать авторизацию. Попробуйте позже или обратитесь в поддержку.');
          return;
        }
        setErrorUserCode(true);
        setInfo(body?.message || 'Ошибка отправки. Попробуйте снова.');
        return;
      }

      handleSuccess(body);
    } catch (error) {
      setErrorUserCode(true);
      setInfo('Ошибка сети. Проверьте подключение и попробуйте снова.');
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

      <InputEmail value={email} onChangeText={setEmail} onValidEmail={handleValidEmail} />

      <ButtonNameIcon buttonText="Регистрация по Telegram" handle={goBack} />

      <View style={style.footer}>
        <TitleWithIcon nameIcon="lock-closed-outline">
          Мы никому не будем передавать твой email. Ваша безопасность превыше всего!
        </TitleWithIcon>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ButtonNameIcon buttonText="Дальше" handle={goToVerification} disable={!isEmailValid} />
        )}
      </View>

      {errorUserCode && (
        <ModalInfo
          message={info}
          backgroundColor={'#ffcc00'}
          textColor="#000"
          onHide={() => setErrorUserCode(false)}
        />
      )}
    </View>
  );
};

export default LoginEmail;
