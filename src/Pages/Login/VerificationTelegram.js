import React, {useEffect, useState} from 'react';
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
  const [title, setTitle] = useState('Мы отправим код подтверждения в Телеграм');
  const [subTitle, setSubTitle] = useState('Тебе нужно будет ввести его ниже и все:)');

   useEffect(() => {
    if (textBtn === 'Дальше') {
      setTitle('Мы уже отправили код тебе в телеграмм');
      setSubTitle('Введите полученный код ниже');
    }
  }, [textBtn]);


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

  const sendCodeUserToBackend = async () => {
    const apiTelegram = Platform.OS === 'ios'
      ? 'http://localhost:3000/api/telegramVerifyCode'
      : 'http://192.168.0.107:3000/api/telegramVerifyCode';

    try {
      const response = await fetch(apiTelegram, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userCode: userCode.trim() }),
      });

      const data = await response.json();

      // alert( data.userId );

      if ( response.ok && data.userId ) {



          // await AsyncStorage.setItem('userId', data.userId );
          // alert( await AsyncStorage.getItem( 'userId' ) );

          if( checkUserCode( data.confirmationCode ) ) {
               setErrorUserCode(true);
               setColorModal('#a7c957');
               setInfo('Супер!!! Код правильный');
          } else {
              setErrorUserCode(true);
              setColorModal('#e56b6f');
              setInfo( "Введен неверный код.Проверьте код еще раз");
          }

      }

    } catch (error) {

      setErrorUserCode(true);
      setInfo('Не удалось связаться с сервером');

    }
  };

  const checkUserCode = ( code ) => {
     return code === userCode;
  }

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
      sendCodeUserToBackend();
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
           {/*Мы отправим код подтверждения в Телеграм.*/}
            { title }
        </SubTitle>
        <SubTitle style={styles.subTitle}>
          {/*Тебе нужно будет ввести его ниже и все:)*/}
            { subTitle }
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
