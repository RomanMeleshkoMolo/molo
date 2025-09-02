/**
 * © [2025] Molo. All rights reserved.
 * Molo is a private development, and all rights are owned by the app's owner.
 */

import React, { useEffect, useCallback, useState } from 'react';
import { View } from 'react-native';

// Connect components
import Title from 'Components/Titles/Title';
import SubTitle from 'Components/Titles/SubTitle';
import PreferenceCard from 'Components/Cards/PreferenceCard';
import ButtonNameIcon from 'Components/Buttons/ButtonNameIcon';

// Connect styles
import styles from 'LoginStyles/LoginUserInterest.scss';

// Connect Redux
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const LAST_ROUTE_KEY = '@authFlow:lastRoute';

// Варианты интересов вынесены в конфиг
const INTEREST_OPTIONS = [
  {
    id: 'dates',
    title: 'Пойти на свидания',
    subtitle: 'Интересные и приятные встречи, заряжают на новые цели.',
    icon: 'wine-outline',
  },
  {
    id: 'chat',
    title: 'Просто общение',
    subtitle: 'Просто общение, где легко быть собой и приятно слушать друг друга.',
    icon: 'people-outline',
  },
  {
    id: 'love',
    title: 'Найти любовь',
    subtitle: 'Найти любовь — это встреча, которая заставляет улыбаться каждый день.',
    icon: 'heart-outline',
  },
];

const LoginUserInterest = ({ navigation }) => {
  const userData = useSelector((state) => state.userData);
  const [selectedId, setSelectedId] = useState(null);

  // Один раз при загрузке страницы отмечаем, что пользователь дошёл до этапа интересов
  useEffect(() => {
    AsyncStorage.setItem('registrationUserInterest', 'true').catch(() => {});
  }, []);

  // Каждый раз при фокусе экрана сохраняем его как "последний"
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.setItem(LAST_ROUTE_KEY, 'LoginUserInterest').catch(() => {});
    }, [])
  );

  const goToNextPage = async () => {
    // Здесь можно сохранить выбор пользователя, если нужно:
    // await AsyncStorage.setItem('@user:interest', selectedId).catch(() => {});
    alert(`go to page. Selected: ${selectedId}`);
    // navigation.navigate('NextScreen'); // пример перехода
  };

  return (
    <View style={styles.container}>
      <Title>Нам важно знать, что тебя интересует больше всего</Title>

      <SubTitle>
        Выбранный ответ даст больше понимания, что тебя интересует, и возможность подобрать для тебя людей.
        Выбранный ответ ты всегда можешь изменить у себя в профиле.
      </SubTitle>

      <View style={styles.containerCards}>
        {INTEREST_OPTIONS.map((opt) => (
          <PreferenceCard
            key={opt.id}
            title={opt.title}
            subtitle={opt.subtitle}
            icon={opt.icon}
            selected={selectedId === opt.id}
            onPress={() =>
              setSelectedId((prev) => (prev === opt.id ? null : opt.id))
            }
          />
        ))}
      </View>

      <View style={styles.footer}>
        <ButtonNameIcon
          buttonText="Дальше"
          handle={goToNextPage}
          disable={!selectedId}
        />
      </View>
    </View>
  );
};

export default LoginUserInterest;
