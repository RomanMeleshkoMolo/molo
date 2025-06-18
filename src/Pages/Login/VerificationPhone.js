import React, { useEffect, useState } from 'react';
import { View, Alert, Text } from 'react-native';

// Connect components
import GoBackButton from "Components/Buttons/GoBackButton";
import Title from "Components/Titles/Title";
import SubTitle from "Components/Titles/SubTitle";
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
import Input from "Components/Inputs/Input";
import ModalSuccess from "Components/Modals/ModalSuccess";

// Connect styles
import styles from "./styles/VerificationPhone.scss";

const VerificationPhone = ({ navigation, route }) => {
  const [text, setText] = useState('');
  const [userCode, setUserCode] = useState('');
  const [errorUserCode, setErrorUserCode] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [lastSixDigits, setLastSixDigits] = useState('');
  const [modalVisible, setModalVisible] = useState(false);


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

  const verificationCode = () => {
    if (userCode === lastSixDigits) {
      Alert.alert("Number is correct!");
    } else {
    }
  };

  const handleValidEmail = (isValid) => {
    setIsCodeValid(isValid);
  };

  const handleUserCode = (input) => {
    setUserCode(input);
  };

  // const handleHide = () => {
  //   setModalVisible(true);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GoBackButton navigation={navigation} />
      </View>

      {/*{modalVisible && (*/}
      {/*  <ModalSuccess*/}
      {/*    message="Действие успешно выполнено!"*/}
      {/*    onHide={handleHide}*/}
      {/*  />*/}
      {/*)}*/}


      <Title>Теперь нам нужно убедиться что полученный код принадлежит тебе</Title>
      <SubTitle>Введи последние 6 цифр в поле ниже:)</SubTitle>
      <SubTitle style={styles.subTitle}>{`${text}`}</SubTitle>

      <Input
        style={styles.input}
        onValidEmail={handleValidEmail}
        userCode={handleUserCode}
        errorUser={errorUserCode}
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





