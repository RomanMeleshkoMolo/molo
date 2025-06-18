/**
 * © [2025] Molo. All rights reserved.
 * Molo is a private development, and all rights are owned by the app's owner.
 */

import React, {useState} from 'react';
import {ActivityIndicator, Alert, View, Text, Button} from 'react-native';

// Connect components
import GoBackButton from "Components/Buttons/GoBackButton";
import Title from "Components/Titles/Title";
import SubTitle from "Components/Titles/SubTitle";
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
import TitleWithIcon from "Components/Titles/TitleWithIcon";
import InputPhone from "Components/Inputs/InputPhone";
import BlurModal from "Components/Modals/BlurModal";

import styles from "./styles/LoginPhone.scss";

const LoginPhone = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
     setModalVisible(!modalVisible);
  };


  const goToVerificationPhone = async () => {

    setLoading(true);
    setModalVisible(false);

     try {
        const response = await fetch('http://10.0.2.2:3000/register-phone', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phone }),
     });

     const result = await response.json();

        if (response.ok && result.success) {

         const phoneTwilio = result.phoneTwilio;

         navigation.navigate('VerificationPhone', { phone, phoneTwilio });

        } else {
          Alert.alert("Ошибка", result.message || "Не удалось отправить код.");
        }
     } catch (error) {
        Alert.alert("Ошибка", "Не удалось связаться с сервером.");
     } finally {
       setLoading(false);
     }
  };

  const goToVerificationEmail = () => {
       navigation.navigate('LoginEmail');
  }

  const handlePhoneNumber = ( isValid ) => {
      setIsPhoneValid(isValid);
  };

  return (
     <View style={[styles.container]}>

        <View style={styles.header}>
            <GoBackButton
               navigation={navigation}
            ></GoBackButton>
        </View>

        <Title>Отлично! Укажи свой номер телефона</Title>
        <SubTitle>Мы позвоним на твой номер.</SubTitle>
        <SubTitle
           colorText="#9d4edd"
        >
            Отвечать на номер не нужно!
        </SubTitle>

        <InputPhone
           style={[styles.input]}
           onChangeText={setPhone}
           onPhoneNumber={handlePhoneNumber}
        ></InputPhone>

        <ButtonNameIcon
              buttonText="Регистрация по email"
              handle={goToVerificationEmail}
        ></ButtonNameIcon>


        {/* Modal window with contents */}
        <BlurModal visible={modalVisible} onClose={toggleModal}>
           <SubTitle>
               Мы позвоним на твой номер и тебе нужно ввести последние 6 цифр на следующей странице
           </SubTitle>

           <SubTitle colorText="#9d4edd">
              Отвечать на номер не нужно!
           </SubTitle>

           {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
           ) : (
              <ButtonNameIcon
                 buttonText="Позвонить"
                 handle={goToVerificationPhone}
                 disable={!isPhoneValid}
              />
           )}
        </BlurModal>


        <View style={styles.footer}>
           <TitleWithIcon
              nameIcon="lock-closed-outline"
           >
               Твой номер телефона никто не увидет в профиле!Будьте спокойны;)
           </TitleWithIcon>

           <ButtonNameIcon
              buttonText="Дальше"
              handle={toggleModal}
              disable={!isPhoneValid}
           ></ButtonNameIcon>

        </View>

     </View>
  );
};

export default LoginPhone;
