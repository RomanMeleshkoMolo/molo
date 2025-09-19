// /**
//  * © [2025] Molo. All rights reserved.
//  * Molo is a private development, and all rights are owned by the app's owner.
//  */
//
// import React, { useEffect, useCallback, useState, useMemo } from 'react';
// import { View, Alert, Platform } from 'react-native';
//
// // Connect Components
// import Title from "Components/Titles/Title";
// import SubTitle from "Components/Titles/SubTitle";
// import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
// import PreferenceCard from "Components/Cards/PreferenceCard";
//
// // Connect styles
// import styles from "LoginStyles/LoginUserLocation.scss";
//
// // Connect Redux
// import { useDispatch } from "react-redux";
// import AsyncStorage from "@react-native-async-storage/async-storage";
//
// import { useFocusEffect } from '@react-navigation/native';
// import {setRegTokenAction, setUserAction} from "redux/actions";
// import TitleWithIcon from "Components/Titles/TitleWithIcon";
// import ModalInfo from "Components/Modals/ModalInfo";
// import Input from "Components/Inputs/Input";
//
// const LAST_ROUTE_KEY = '@authFlow:lastRoute';
//
//
// // Path of end-point
// const startPath = '/onboarding/wish';
//
// const LoginUserLocation = ({ navigation }) => {
//   const [token, setToken] = useState(null);
//
//   const dispatch = useDispatch();
//
//   const [nameLocation, setNameLocation] = useState('');
//   const [isNameValid, setIsNameValid] = useState(false);
//
//   const [selectedTitle, setSelectedTitle] = useState(null);
//   const [loading, setLoading] = useState(false);
//
//   // It is for Modal window
//   const [info, setInfo] = useState('');
//   const [colorModal, setColorModal] = useState('#ffcc00');
//   const [errorUserCode, setErrorUserCode] = useState(false);
//
//   // Базовый URL под реальное устройство
//   const baseURL = useMemo(() => {
//     if (Platform.OS === 'ios') return 'http://localhost:3000';
//     return 'http://192.168.0.107:3000';
//   }, []);
//
//   useEffect(() => {
//     AsyncStorage.setItem('registrationUserLocation', 'true').catch(() => {});
//   }, []);
//
//   useFocusEffect(
//     useCallback(() => {
//       AsyncStorage.setItem(LAST_ROUTE_KEY, 'LoginUserLocation').catch(() => {});
//     }, [])
//   );
//
//   useEffect(( token ) => {
//     const hydrate = async () => {
//       setToken( await AsyncStorage.getItem('regToken') )
//       if (token) dispatch(setRegTokenAction(token));
//     };
//     hydrate();
//   }, [dispatch]);
//
//   const normalizeInput = (s) => s
//
//     .normalize('NFKC')
//     .replace(/\s+/g, ' ')
//     .replace(/[-']{2,}/g, (m) => m[0]);
//
//   const validateName = (raw) => {
//     const value = normalizeInput(raw);
//     const trimmed = value.trim();
//
//     if( trimmed.length > 30 ) {
//       setErrorUserCode(true);
//       setInfo('Слишком длинное имя!');
//     }
//
//     if (trimmed.length < 2 || trimmed.length > 30) {
//       return { valid: false, value: trimmed, reason: 'length' };
//     }
//     if (!NAME_REGEX.test(trimmed)) {
//       return { valid: false, value: trimmed, reason: 'chars' };
//     }
//     return { valid: true, value: trimmed };
//   };
//
//
//    const handleUserNameChange = (name) => {
//      setNameLocation(name);
//
//      const { valid } = validateName(name);
//      setIsNameValid(valid);
//   };
//
//   const goToNextPage = async () => {
//     if (!selectedTitle) {
//       Alert.alert('Выбор не сделан', 'Пожалуйста, выберите один из вариантов, чтобы продолжить.');
//       return;
//     }
//
//
//     try {
//       setLoading(true);
//
//       const payload = { gender: selectedTitle };
//
//       const response = await fetch(`${baseURL}${startPath}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token ? `Bearer ${token}` : '',
//         },
//         body: JSON.stringify(payload),
//       });
//
//       const data = await response.json().catch(() => ({}));
//
//       if (!response.ok) throw new Error(data?.message || 'Не удалось сохранить');
//
//       if (data.user) {
//         dispatch(setUserAction(data.user));
//       }
//
//       navigation.replace('LoginUserLoadPhoto');
//
//     } catch (error) {
//       Alert.alert('Ошибка сохранения', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//      <View style={styles.container}>
//         <Title>Теперь укажи свое местопожение</Title>
//
//         <SubTitle>
//           Выбранное местопожение даст возможность подобрать для тебя людей которые рядом.
//         </SubTitle>
//
//
//            <Input
//              style={styles.input}
//              keyboardType='default'
//              userName={handleUserNameChange}
//              maxLength={50}
//              autoFocus={true}
//            />
//
//
//
//         <View style={styles.footer}>
//            <TitleWithIcon
//              nameIcon="information-circle-outline">
//              Выбранное местоположение будет отображаться у тебя в профиле
//            </TitleWithIcon>
//
//            <ButtonNameIcon
//               buttonText={loading ? 'Сохраняем...' : 'Дальше'}
//               handle={loading ? undefined : goToNextPage}
//               disable={loading || !selectedTitle}
//            />
//         </View>
//
//          {errorUserCode && (
//              <ModalInfo
//                  message={ info }
//                  backgroundColor={colorModal}
//                  textColor="#000"
//                  onHide={() => setErrorUserCode(false)}
//              />
//             )}
//
//      </View>
//   );
// };
//
// export default LoginUserLocation;


/**
 * © <a href="" class="citation-link" target="_blank" style="vertical-align: super; font-size: 0.8em; margin-left: 3px;">[2025]</a> Molo. All rights reserved.
 * Molo is a private development, and all rights are owned by the app's owner.
 */

import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { View, Alert, Platform } from 'react-native';

// Connect Components
import Title from "Components/Titles/Title";
import SubTitle from "Components/Titles/SubTitle";
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";

// Connect styles
import styles from "LoginStyles/LoginUserLocation.scss";

// Connect Redux
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from '@react-navigation/native';
import { setRegTokenAction, setUserAction } from "redux/actions";
import TitleWithIcon from "Components/Titles/TitleWithIcon";
import ModalInfo from "Components/Modals/ModalInfo";
import Input from "Components/Inputs/Input";

const LAST_ROUTE_KEY = '@authFlow:lastRoute';

// Path of end-point
const startPath = '/onboarding/location';

// Разрешаем буквы (латиница/кириллица и распространённые акцентированные символы), пробелы, дефис, апостроф и точку
const LOCATION_REGEX = /^[A-Za-zА-Яа-яЁёІіЇїЄєĞğÜüŞşÇçÖöÀ-ÖØ-öø-ÿ'’.\-\s]+$/;

const LoginUserLocation = ({ navigation }) => {
  const dispatch = useDispatch();

  const [token, setToken] = useState(null);

  const [location, setLocation] = useState('');
  const [isLocationValid, setIsLocationValid] = useState(false);

  const [loading, setLoading] = useState(false);

  // Для модального окна
  const [info, setInfo] = useState('');
  const [colorModal, setColorModal] = useState('#ffcc00');
  const [errorUserCode, setErrorUserCode] = useState(false);

  // Базовый URL под реальное устройство
  const baseURL = useMemo(() => {
    if (Platform.OS === 'ios') return 'http://localhost:3000';
    return 'http://192.168.0.107:3000';
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('registrationUserLocation', 'true').catch(() => {});
  }, []);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.setItem(LAST_ROUTE_KEY, 'LoginUserLocation').catch(() => {});
    }, [])
  );

  useEffect(() => {
    const hydrate = async () => {
      try {
        const t = await AsyncStorage.getItem('regToken');
        setToken(t);
        if (t) dispatch(setRegTokenAction(t));
      } catch {}
    };
    hydrate();
  }, [dispatch]);

  const normalizeInput = (s) => s
    .normalize('NFKC')
    .replace(/\s+/g, ' ')      // сжать множественные пробелы
    // .replace(/[-']{2,}/g, (m) => m <a href="" class="citation-link" target="_blank" style="vertical-align: super; font-size: 0.8em; margin-left: 3px;">[0]</a>);

  const validateLocation = (raw) => {
    const value = normalizeInput(raw);
    const trimmed = value.trim();

    if (trimmed.length > 30) {
      setErrorUserCode(true);
      setInfo('Слишком длинное название города!');
    }

    if (trimmed.length < 2 || trimmed.length > 50) {
      return { valid: false, value: trimmed, reason: 'length' };
    }
    if (!LOCATION_REGEX.test(trimmed)) {
      return { valid: false, value: trimmed, reason: 'chars' };
    }
    return { valid: true, value: trimmed };
  };

  const handleLocationChange = (text) => {
    setLocation(text);
    const { valid } = validateLocation(text);
    setIsLocationValid(valid);
  };

  const goToNextPage = async () => {
    // Доп. защита
    const { valid, value } = validateLocation(location);
    if (!valid) {
      Alert.alert('Неверный ввод', 'Введите корректное название города или посёлка (2–50 символов).');
      return;
    }

    try {
      setLoading(true);

      const payload = { location: value };

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
        throw new Error(data?.message || 'Не удалось сохранить местоположение');
      }

      // Ожидаем, что бэкенд вернёт обновлённого пользователя
      if (data.user) {
        dispatch(setUserAction(data.user));
      }

      // navigation.replace('LoginUserLoadPhoto');
    } catch (error) {
      Alert.alert('Ошибка сохранения', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title>Теперь укажи своё местоположение</Title>

      <SubTitle>
        Это поможет подобрать людей рядом с тобой.
      </SubTitle>

      <Input
        style={styles.input}
        keyboardType="default"
        userName={handleLocationChange}  // оставляем проп под ваш кастомный компонент
        value={location}                 // если ваш Input поддерживает value — будет контролируемым
        maxLength={50}
        autoFocus={true}
        placeholder="Например, Москва или Геленджик"
      />

      <View style={styles.footer}>
        <TitleWithIcon nameIcon="information-circle-outline">
          Выбранное местоположение будет отображаться в твоём профиле
        </TitleWithIcon>

        <ButtonNameIcon
          buttonText={loading ? 'Сохраняем...' : 'Дальше'}
          handle={loading || !isLocationValid ? undefined : goToNextPage}
          disable={loading || !isLocationValid}
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

export default LoginUserLocation;

