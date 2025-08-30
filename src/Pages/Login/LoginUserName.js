 /**
 * © [2025] Molo. All rights reserved.
 * Molo is a private development, and all rights are owned by the app's owner.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { View, Alert, Platform } from 'react-native';
import Title from "Components/Titles/Title";
import SubTitle from "Components/Titles/SubTitle";
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
import Input from "Components/Inputs/Input";

// Connect styles
import styles from "LoginStyles/LoginUserName.scss";

// Connect Redux Hooks
import { useDispatch, useSelector } from "react-redux";

const setRegTokenAction = (token) => ({ type: 'SET_REG_TOKEN', payload: token });
const setUserAction = (user) => ({ type: 'SET_USER', payload: user });

const LoginUserName = ({ navigation }) => {
  const [nameUser, setNameUser] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);
  const regToken = userData?.regToken;
  const email = userData?.email;     // или chatId/phone, что у вас есть
  const chatId = userData?.chatId;

  const baseURL = useMemo(() => {

    if (Platform.OS === 'ios') return 'http://localhost:3000';
    // return 'http://10.0.2.2:3000'; // Android эмулятор
    return 'http://192.168.0.107:3000'; // реальное устройство

  }, []);

  const startPath = '/onboarding/start'; // или '/users/onboarding/start'
  const namePath = '/onboarding/name';   // или '/users/onboarding/name'

  const handleUserNameChange = (name) => {
    setNameUser(name);
    const trimmed = name.trim();
    setIsNameValid(trimmed.length >= 2 && trimmed.length <= 50);
  };

  // Гарантируем сессию при монтировании (как раньше)
  useEffect(() => {
    const ensureOnboardingSession = async () => {

      if (regToken) return;

      try {
        setLoading(true);
        const res = await fetch(`${baseURL}${startPath}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,   // или chatId
            chatId,
          }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) throw new Error(data?.message || 'Не удалось начать онбординг');

        dispatch(setRegTokenAction(data.regToken));

        if (data.user) dispatch(setUserAction(data.user));

      } catch (e) {

        Alert.alert('Ошибка', e.message);

      } finally {
        setLoading(false);
      }
    };
    ensureOnboardingSession();
  }, [regToken, email, chatId, baseURL, dispatch]);

  // Подстраховка: если токена нет к моменту клика, попробуем получить его прямо здесь
  const ensureRegTokenNow = async () => {

    if (regToken) return regToken;

    const res = await fetch(`${baseURL}${startPath}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, chatId }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) throw new Error(data?.message || 'Не удалось начать онбординг');

    dispatch(setRegTokenAction(data.regToken));

    if (data.user) dispatch(setUserAction(data.user));

    return data.regToken;
  };

  const goToNextPage = async () => {

    const trimmed = nameUser.trim();

    if (!isNameValid) {
      Alert.alert('Некорректное имя', 'Имя должно быть от 2 до 50 символов.');
      return;
    }

    try {
      setLoading(true);

      // Подстраховка: получаем regToken, если его еще нет
      const token = regToken || await ensureRegTokenNow();

      const response = await fetch(`${baseURL}${namePath}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: trimmed }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(data?.message || 'Не удалось обновить имя');

      if (data.user) dispatch(setUserAction(data.user));

      navigation.navigate('LoginUserInterest');
    } catch (error) {

      Alert.alert('Ошибка', error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title>Супер! Это первый шаг к знакомству! Как тебя зовут?</Title>
      <SubTitle>Указанное тобой имя будет отображаться у тебя в профиле</SubTitle>

      <Input
        style={styles.input}
        keyboardType='default'
        userName={handleUserNameChange}
      />

      <View style={styles.footer}>
        <ButtonNameIcon
          buttonText={loading ? "Сохраняем..." : "Дальше"}
          handle={loading ? undefined : goToNextPage}
          disable={!isNameValid || loading}
        />
      </View>
    </View>
  );
};

export default LoginUserName;
