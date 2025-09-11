import React, { useEffect, useMemo, useState } from 'react';
import { View, Platform } from 'react-native';

// Redux
import { useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Navigate
// import { useFocusEffect } from '@react-navigation/native';
import { setRegTokenAction, setUserAction } from "redux/actions";

// Connect Components
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
import ModalInfo from "Components/Modals/ModalInfo";
import Title from "Components/Titles/Title";
import SubTitle from "Components/Titles/SubTitle";

import styles from "LoginStyles/LoginUserGender.scss";
import TitleWithIcon from "Components/Titles/TitleWithIcon";

const LAST_ROUTE_KEY = '@authFlow:lastRoute';

const startPath = '/onboarding/gender';

const LoginUserGender = ({ navigation }) => {
  const dispatch = useDispatch();

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // Выбор пола (локально)
  const [gender, setGender] = useState(''); // '', 'male', 'female', 'other'
  const [errorUserCode, setErrorUserCode] = useState(false);
  const [info, setInfo] = useState('');
  const [colorModal, setColorModal] = useState('#ffcc00');

  // Базовый URL
  const baseURL = useMemo(() => {
    if (Platform.OS === 'ios') return 'http://localhost:3000';
    return 'http://192.168.0.107:3000';
  }, []);

  // Метаданные локального стора
  useEffect(() => {
    AsyncStorage.setItem('registrationUserGender', 'true').catch(() => {});
  }, []);

  // LAST_ROUTE
  useEffect(() => {
    AsyncStorage.setItem(LAST_ROUTE_KEY, 'LoginUserGender').catch(() => {});
  }, []);

  // hydrate токен
  useEffect(() => {
    const hydrate = async () => {
      const t = await AsyncStorage.getItem('regToken');
      setToken(t);
      if (t) dispatch(setRegTokenAction(t));
    };
    hydrate();
  }, [dispatch]);

  // Отправка выбранного пола
  const goToNextPage = async () => {
    // валидируем выбор
    if (!gender) {
      setErrorUserCode(true);
      setInfo('Пожалуйста, выберите пол');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        gender,
      };

      const response = await fetch(`${baseURL}${startPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setErrorUserCode(true);
        setInfo(data?.message || 'Не удалось сохранить выбранный гендер');
      }

      if (data.user) {
        dispatch(setUserAction(data.user));
      }


      navigation.replace('LoginUserWish');
    } catch (error) {
      setErrorUserCode(true);
      setInfo(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
     <View style={styles.container}>
        <Title>Супер! Теперь выбери свой гендер</Title>

        <SubTitle>
          Укажи свой гендер который соответствует твоему полу.
        </SubTitle>

        <View style={styles.genderRow}>

           <ButtonNameIcon
             buttonText={'Мужской'}
             handle={() => setGender('male')}
           />

           <ButtonNameIcon
              buttonText={'Женский'}
              handle={() => setGender('female')}
           />

        </View>

        <View style={styles.footer}>
           <TitleWithIcon
               nameIcon="information-circle-outline"
           >
              Этот выбор ты сможешь изменить у себя в профиле
           </TitleWithIcon>

           <ButtonNameIcon
             buttonText={loading ? 'Сохраняем...' : 'Дальше'}
             handle={loading ? undefined : goToNextPage}
             disable={loading || !gender}
           />
        </View>

        {errorUserCode && (
           <ModalInfo
             message={info}
             backgroundColor={colorModal}
             textColor="#000"
             onHide={() => setErrorUserCode(false)}
           />
        )}
     </View>
  );
};

export default LoginUserGender;
