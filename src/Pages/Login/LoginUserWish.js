/**
 * © [2025] Molo. All rights reserved.
 * Molo is a private development, and all rights are owned by the app's owner.
 */

import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { View, Alert, Platform } from 'react-native';

// Connect Components
import Title from "Components/Titles/Title";
import SubTitle from "Components/Titles/SubTitle";
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
import PreferenceCard from "Components/Cards/PreferenceCard";

// Connect styles
import styles from "LoginStyles/LoginUserWish.scss";

// Connect Redux
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from '@react-navigation/native';
import {setRegTokenAction, setUserAction} from "redux/actions";
import TitleWithIcon from "Components/Titles/TitleWithIcon";

const LAST_ROUTE_KEY = '@authFlow:lastRoute';

const INTEREST_OPTIONS = [
  { id: 'dates',
    title: 'Мужчин',
    gender: 'male',
    icon: 'male-outline'
  },
  { id: 'chat',
    title: 'Женщин',
    gender: 'female',
    icon: 'female-outline'
  },
  { id: 'love',
    title: 'Всех',
    gender: 'all',
    icon: 'male-female-outline'
  },
];

// Path of end-point
const startPath = '/onboarding/wish';

const LoginUserWish = ({ navigation }) => {
  const [token, setToken] = useState(null);

  const dispatch = useDispatch();

  const [selectedTitle, setSelectedTitle] = useState(null);
  const [loading, setLoading] = useState(false);

  // Базовый URL под реальное устройство
  const baseURL = useMemo(() => {
    if (Platform.OS === 'ios') return 'http://localhost:3000';
    return 'http://192.168.0.107:3000';
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('registrationUserWish', 'true').catch(() => {});
  }, []);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.setItem(LAST_ROUTE_KEY, 'LoginUserWish').catch(() => {});
    }, [])
  );

  useEffect(( token ) => {
  const hydrate = async () => {
    setToken( await AsyncStorage.getItem('regToken') )
    if (token) dispatch(setRegTokenAction(token));
  };
  hydrate();
}, [dispatch]);

  const goToNextPage = async () => {
    if (!selectedTitle) {
      Alert.alert('Выбор не сделан', 'Пожалуйста, выберите один из вариантов, чтобы продолжить.');
      return;
    }


    try {
      setLoading(true);

      const payload = { gender: selectedTitle };

      const response = await fetch(`${baseURL}${startPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(data?.message || 'Не удалось сохранить');

      if (data.user) {
        dispatch(setUserAction(data.user));
      }

      navigation.replace('LoginUserLoadPhoto');

    } catch (error) {
      Alert.alert('Ошибка сохранения', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
     <View style={styles.container}>
        <Title>Кого ты желаешь увидеть?</Title>

        <SubTitle>
          Выбранный ответ даст больше понимания и возможность подобрать для тебя людей.
        </SubTitle>

        <View style={styles.containerCards}>
           {INTEREST_OPTIONS.map((opt) => (
              <PreferenceCard
                key={opt.id}
                title={opt.title}
                subtitle={opt.subtitle}
                icon={opt.icon}
                selected={selectedTitle === opt.gender}
                onPress={() => setSelectedTitle((prev) => (prev === opt.gender ? null : opt.gender))}
              />
           ))}
        </View>

        <View style={styles.footer}>
           <TitleWithIcon
             nameIcon="information-circle-outline">
             Выбранный тобой ответ не будет отображаться у тебя в профиле
           </TitleWithIcon>

           <ButtonNameIcon
              buttonText={loading ? 'Сохраняем...' : 'Дальше'}
              handle={loading ? undefined : goToNextPage}
              disable={loading || !selectedTitle}
           />
        </View>

     </View>
  );
};

export default LoginUserWish;
