/**
 * © [2025] Molo. All rights reserved.
 * Molo is a private development, and all rights are owned by the app's owner.
 */

import React, { useEffect, useState } from 'react';
import {View, Text} from 'react-native';

// Connect components
import GoBackButton from "Components/Buttons/GoBackButton";
import Title from "Components/Titles/Title";
import SubTitle from "Components/Titles/SubTitle";
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
import Input from "Components/Inputs/Input";

// Connect styles
import styles from "LoginStyles/VerificationPhone.scss";
import ModalInfo from "Components/Modals/ModalInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VerificationPhone = ({ navigation, route }) => {
  const [text, setText] = useState('');
  const [userCode, setUserCode] = useState('');
  const [errorUserCode, setErrorUserCode] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [lastSixDigits, setLastSixDigits] = useState('');
  const [modalColor, setModalColor] = useState('red');
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    if (route.params?.phone) {
      setText(route.params.phone);

      // Получаем последние 6 цифр номера
      const digits = route.params.phoneTwilio.replace(/\D/g, '').slice(-6);
      setLastSixDigits(digits);
    }
  }, [route.params]);

  const goBack = () => {
    navigation.goBack();
  };

  const verificationCode = async () => {
    if (userCode === lastSixDigits) {
      setModalColor('#a7c957');
      setModalText("Код верный");
      setErrorUserCode(true);

       await AsyncStorage.setItem('registrationUserPhoneState', 'true');

        // Go to other page
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginUserName' }],
        });

    } else {
      setModalColor('#e56b6f');
      setModalText("Введенный неверный код!");
      setErrorUserCode(true);
    }
  };

  const handleValidEmail = (isValid) => {
    setIsCodeValid(isValid);
  };

  const handleUserCode = (input) => {
    setUserCode(input);
  };

  return (
     <View style={styles.container}>

        {errorUserCode && (
           <ModalInfo
              message={modalText}
              backgroundColor={modalColor}
              textColor="#fff"
              onHide={() => setErrorUserCode(false)}
           />
         )}

        <Title>
           Теперь нам нужно убедиться что полученный код принадлежит тебе
        </Title>

        <SubTitle>
           Введи последние 6 цифр в поле ниже:)
        </SubTitle>

        <SubTitle
           style={styles.subTitle}
        >{`${text}`}
        </SubTitle>

        <Input
           style={styles.input}
           onValidEmail={handleValidEmail}
           userCode={handleUserCode}
           // errorUser={errorUserCode}
           // modalColor={modalColor}
           // modalText={modalText}
           // setErrorUserCode={setErrorUserCode} // Pass the setter to reset the error
        />

        <Text style={styles.link} onPress={goBack}>
           Не получил звонок?
        </Text>

        <View style={styles.footer}>
           <ButtonNameIcon
             buttonText="Дальше"
             handle={verificationCode}
             disable={!isCodeValid}
           />
        </View>

     </View>
  );
};

export default VerificationPhone;

