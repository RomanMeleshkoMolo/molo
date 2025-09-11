/**
 * © [2025] Molo. All rights reserved.
 * Molo is a private development, and all rights are owned by the app's owner.
 */

import React, { useEffect, useCallback, useMemo, useState, useRef } from 'react';
import { View, Alert, Platform, Text, Keyboard } from 'react-native';

// Connect Redux
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from '@react-navigation/native';
import { setRegTokenAction, setUserAction } from "redux/actions";

// Connect Components
import Title from "Components/Titles/Title";
import SubTitle from "Components/Titles/SubTitle";
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
import InputPicker from "Components/Inputs/InputPicker";
import ModalInfo from "Components/Modals/ModalInfo";

// Connect styles
import styles from "LoginStyles/LoginUserBirthday.scss";

// Flag for last Page
const LAST_ROUTE_KEY = '@authFlow:lastRoute';

// Path to end-point at server
const startPath = '/onboarding/birthday';


const LoginUserBirthday = ({ navigation }) => {
  const dispatch = useDispatch();

  // Имя пользователя из Redux
  const userName = useSelector((state) =>  {

    return state.user?.userName ?? state.userData?.name ?? ''

  });

  // Токен и флаги загрузки
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // Поля ввода: день, месяц, год
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

   // It is for Modal window
  const [info, setInfo] = useState('');
  const [colorModal, setColorModal] = useState('#ffcc00');
  const [errorUserCode, setErrorUserCode] = useState(false);


  // Вспомогательные состояния
  const [birthDateParts, setBirthDateParts] = useState(null);
  const [birthDateISO, setBirthDateISO] = useState(null);
  const [age, setAge] = useState(null);

  // Рефы для фокусировки
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  // Базовый URL
  const baseURL = useMemo(() => {
    if (Platform.OS === 'ios') return 'http://localhost:3000';
    return 'http://192.168.0.107:3000';
  }, []);

  // Метаданные локального стора
  useEffect(() => {
    AsyncStorage.setItem('registrationUserBirthday', 'true').catch(() => {});
  }, []);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.setItem(LAST_ROUTE_KEY, 'LoginUserBirthday').catch(() => {});
    }, [])
  );

  // Хранение токена
  useEffect(( token ) => {
    const hydrate = async () => {
      setToken( await AsyncStorage.getItem('regToken') );
      if (token) dispatch(setRegTokenAction(token));
    };
    hydrate();
  }, [dispatch]);


  // Авто-расчет возраста и формирования частей даты
  useEffect(() => {
    // Требуется полный ввод: день (2 цифры), месяц (2 цифры) и год (4 цифры)
    if (!day || !month || !year) {
      setBirthDateParts(null);
      setBirthDateISO(null);
      setAge(null);
      return;
    }

    // Проверяем длины
    if (day.length !== 2 || month.length !== 2 || year.length !== 4) {
      // Ждем полного ввода
      setBirthDateParts(null);
      setBirthDateISO(null);
      setAge(null);
      return;
    }

    const d = Number(day);
    const m = Number(month);
    const y = Number(year);

    if (isNaN(d) || isNaN(m) || isNaN(y)) {
      setBirthDateParts(null);
      setBirthDateISO(null);
      setAge(null);
      return;
    }

    const dt = new Date(y, m - 1, d);

    if (
      dt.getFullYear() !== y ||
      dt.getMonth() !== m - 1 ||
      dt.getDate() !== d
    ) {
      setBirthDateParts(null);
      setBirthDateISO(null);
      setAge(null);
      return;
    }

    const parts = { day: d, month: m, year: y };
    const iso = dt.toISOString();

    // Расчет возраста
    const today = new Date();
    let calcAge = today.getFullYear() - y;
    const monthDiff = today.getMonth() + 1 - m;
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < d)) {
      calcAge--;
    }

    setBirthDateParts(parts);
    setBirthDateISO(iso);
    setAge(calcAge);
  }, [day, month, year]);


  // Нормализация ввода: ограничиваем цифры и авто-переход к следующему полю
  const onDayChange = (text) => {
    const v = text.replace(/\D/g, '').slice(0, 2);
    setDay(v);
    if (v.length === 2) monthRef.current?.focus();
  };
  const onMonthChange = (text) => {
    const v = text.replace(/\D/g, '').slice(0, 2);
    setMonth(v);
    if (v.length === 2) yearRef.current?.focus();
  };
  const onYearChange = (text) => {
    const v = text.replace(/\D/g, '').slice(0, 4);
    setYear(v);

  };

  // Показ даты в виде строки
  const displayDate = day && month && year ? `${day}.${month}.${year}` : 'ДД.ММ.ГГГГ';

  // Отправка payload
  const goToNextPage = async () => {
    // Валидация заполнения
    if (!day || !month || !year || !birthDateParts || !birthDateISO || age == null) {

      setErrorUserCode(true);
      setInfo('Неверные данные', 'Пожалуйста, заполните день, месяц и год рождения корректно.');

      return;
    }

    try {
      setLoading(true);

      const payload = {
        birthDate: birthDateISO.split('T')[0], // 'YYYY-MM-DD' (ISO)
        birthDateParts,
        age,
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
        setInfo('Не удалось сохранить дату рождения');

      }

      if (data.user) {
        dispatch(setUserAction(data.user));
      }

      // navigation.navigate('NextScreen'); // замени на реальный маршрут
    } catch (error) {

      setErrorUserCode(true);
      setInfo( error.message );

    } finally {
      setLoading(false);
    }
  };

  // Визуальные элементы и структура
  return (
     <View style={styles.container}>
        <Title>Приятно познакомиться!</Title>
        <Title>{userName || 'Гость'}{" "}{age != null ? age : '--'}</Title>

        <SubTitle>
          Теперь укажи свой день рождения чтоб другие пользователи могли видеть твой возраст.
        </SubTitle>

        <View style={styles.inputRow}>
           <View style={styles.inputGroup}>
              <Text style={styles.label}>День</Text>
              <InputPicker
                keyboardType="numeric"
                maxLength={2}
                value={day}
                onChangeText={onDayChange}
                ref={dayRef}
                onSubmitEditing={() => monthRef.current?.focus()}
                returnKeyType="next"
                autoFocus={true}
              />
           </View>

           <View style={styles.inputGroup}>
              <Text style={styles.label}>Месяц</Text>

              <InputPicker
                 keyboardType="numeric"
                 maxLength={2}
                 value={month}
                 onChangeText={onMonthChange}
                 ref={monthRef}
                 onSubmitEditing={() => yearRef.current?.focus()}
                 returnKeyType="next"
              />

           </View>

           <View style={styles.inputGroup}>
              <Text style={styles.label}>Год</Text>
              <InputPicker
                 keyboardType="numeric"
                 maxLength={4}
                 value={year}
                 onChangeText={onYearChange}
                 ref={yearRef}
                 onSubmitEditing={Keyboard.dismiss}
                 returnKeyType="done"
             />
           </View>

        </View>


        <View style={styles.footer}>
           <ButtonNameIcon
              buttonText={loading ? 'Сохраняем...' : 'Дальше'}
              handle={loading ? undefined : goToNextPage}
              disable={loading || !day || !month || !year}
           />
        </View>

        {errorUserCode && (
           <ModalInfo
              message={ info }
              backgroundColor={colorModal}
              textColor="#000"
              onHide={() => setErrorUserCode(false)}
           />
        )}

     </View>
  );
};

export default LoginUserBirthday;
