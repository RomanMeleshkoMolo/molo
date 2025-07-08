import React, { useState } from 'react';
import {View, Linking, Platform, ActivityIndicator} from 'react-native';

// Connect components
import GoBackButton from "Components/Buttons/GoBackButton";
import Title from "Components/Titles/Title";
import SubTitle from "Components/Titles/SubTitle";
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
import Input from "Components/Inputs/Input";
import ModalInfo from "Components/Modals/ModalInfo";

// Connect styles
import styles from "LoginStyles/VerificationTelegram.scss";

// Connect Navigation
import { useNavigation } from '@react-navigation/native';

// Connect AsyncStorage for check Tokens
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerificationTelegram = ({ route }) => {
  const navigation = useNavigation();

  const [textBtn, setTextBtn] = useState('Открыть телеграм бот');
  const [info, setInfo] = useState('');
  const [errorUserCode, setErrorUserCode] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [colorModal, setColorModal] = useState('#ffcc00');
  const [loading, setLoading] = useState(false);


  const openTelegramBot = () => {
    const botUsername = 'MoloChatBot';
    const url = `https://t.me/${botUsername}`;

    setLoading(true);
    Linking.openURL(url)
      .then(() => {
        setLoading(false);
        setTextBtn('Дальше');
      })
      .catch(err => {
        console.error("Ошибка при открытии Telegram", err);
        setLoading(false);
      });
  };

  const checkCodeUser = async () => {
    const apiTelegram = Platform.OS === 'ios'
      ? 'http://localhost:3000/api/telegramVerifyCode'
      : 'http://10.0.2.2:3000/api/telegramVerifyCode';

    try {
      const response = await fetch(apiTelegram, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userCode: userCode.trim() }),
      });

      const result = await response.json();

      if ( response.ok && result.success ) {

          setErrorUserCode(true);
          setColorModal('#a7c957');
          setInfo('Супер!!! Код правильный');

          await AsyncStorage.setItem('registrationUserTelegramState', 'true');

         // Go to other page
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginUserName' }],
        });

      } else {

        setErrorUserCode(true);
        setColorModal('#e56b6f');
        setInfo( "Введен неверный код.Проверьте код еще раз");

      }
    } catch (error) {

      setErrorUserCode(true);
      setInfo('Не удалось связаться с сервером');

    }
  };

  const checkInputUserCode = (input) => {
    setUserCode(input);

    if (textBtn === 'Дальше' && input.length > 6) {

      setIsCodeValid(true);
      setErrorUserCode(true);
      setInfo('Код не должен превышать 6 символов');

    } else if (textBtn === 'Дальше' && input.length > 5) {

      setIsCodeValid(true);

    } else if (textBtn === 'Дальше') {

      setIsCodeValid(false);
      setErrorUserCode(false);

    }
  };

  const checkNameButton = () => {
    if (textBtn === 'Открыть телеграм бот') {
      openTelegramBot();
    } else if (textBtn === 'Дальше') {
      checkCodeUser();
    }
  };

  return (
     <View style={styles.container}>
        <View style={styles.header}>
          <GoBackButton navigation={navigation} />
        </View>

        <Title>
          Теперь нам нужно убедиться что полученный код пренадлежит тебе
        </Title>
        <SubTitle style={styles.subTitle}>
           Мы отправили код подтверждения в Телеграм.
        </SubTitle>
        <SubTitle style={styles.subTitle}>
          Просто введите его ниже и все:)
        </SubTitle>

        <Input
          userCode={checkInputUserCode}
          errorUser={errorUserCode}

          autoFocus={false}
        />

        <View style={styles.footer}>
           <ButtonNameIcon
             buttonText={loading ? <ActivityIndicator color="#fff" /> : textBtn}
             handle={checkNameButton}
             disable={!isCodeValid || loading}
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

export default VerificationTelegram;























// import React, { useEffect, useState, useCallback } from 'react';
// import { View, Linking, Platform, Alert } from 'react-native';
// import GoBackButton from "Components/Buttons/GoBackButton";
// import Title from "Components/Titles/Title";
// import SubTitle from "Components/Titles/SubTitle";
// import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
// import Input from "Components/Inputs/Input";
// import ModalInfo from "Components/Modals/ModalInfo";
// import styles from "LoginStyles/VerificationTelegram.scss";
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
//
// const VerificationTelegram = ({ route }) => {
//   const navigation = useNavigation();
//
//   const [textBtn, setTextBtn] = useState('Открыть телеграм бот');
//   const [errorUserCode, setErrorUserCode] = useState(false);
//   const [userCode, setUserCode] = useState('');
//   const [isCodeValid, setIsCodeValid] = useState(true);
//   const [callFunction, setCallFunction] = useState(() => openTelegramBot);
//
//   useEffect(() => {
//     if (textBtn === 'Дальше') {
//       setCallFunction(() => checkCodeUser);
//       setIsCodeValid(false);
//     } else {
//       setCallFunction(() => openTelegramBot);
//       setIsCodeValid(true);
//     }
//   }, [textBtn]);
//
//   const openTelegramBot = () => {
//     const botUsername = 'MoloChatBot';
//     const url = `https://t.me/${botUsername}`;
//
//     setTextBtn('Дальше');
//
//     Linking.openURL(url).catch(err => console.error("Ошибка при открытии Telegram", err));
//   };
//
//   const checkCodeUser = useCallback(async () => {
//     const apiTelegram = Platform.OS === 'ios'
//       ? 'http://localhost:3000/api/confirmation'
//       : 'http://10.0.2.2:3000/api/confirmation';
//
//     try {
//       alert(`Отправка кода: ${userCode}`); // Check the current userCode
//       const response = await fetch(apiTelegram, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userCode: userCode }),
//       });
//
//       const result = await response.json();
//
//       if (response.ok) {
//         if (result.success && result.codeUser) {
//           // Handle successful match
//         }
//       } else {
//         Alert.alert("Ошибка", result.message || "Не удалось отправить код.");
//       }
//
//     } catch (error) {
//       Alert.alert("Ошибка", "Не удалось связаться с сервером.");
//     }
//   }, [userCode]); // Add userCode as a dependency
//
//   const handleUserCode = (input) => {
//     setUserCode(input);
//
//     if (textBtn === 'Дальше' && input.length > 6) {
//       setIsCodeValid(true);
//       setErrorUserCode(true);
//     } else if (textBtn === 'Дальше' && input.length > 5) {
//       setIsCodeValid(true);
//     } else if (textBtn === 'Дальше') {
//       setIsCodeValid(false);
//       setErrorUserCode(false);
//     }
//   }
//
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <GoBackButton navigation={navigation} />
//       </View>
//
//       <Title>
//         Теперь нам нужно убедиться что полученный код пренадлежит тебе
//       </Title>
//       <SubTitle style={styles.subTitle}>
//         Мы отправили код подтверждения в Телеграм.
//       </SubTitle>
//       <SubTitle style={styles.subTitle}>
//         Просто введите его ниже и все:)
//       </SubTitle>
//
//       <Input
//         userCode={handleUserCode}
//         errorUser={errorUserCode}
//         autoFocus={false}
//       />
//
//       <View style={styles.footer}>
//         <ButtonNameIcon
//           buttonText={textBtn}
//           handle={callFunction}
//           disable={!isCodeValid}
//         />
//       </View>
//
//       {errorUserCode && (
//         <ModalInfo
//           message="Код не должен превышать 6 символов"
//           backgroundColor="#ffcc00"
//           textColor="#000"
//           onHide={() => setErrorUserCode(false)}
//         />
//       )}
//     </View>
//   );
// };
//
// export default VerificationTelegram;
