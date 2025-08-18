import React, { useState } from 'react';
import {ActivityIndicator, Alert, Platform, View} from 'react-native';

// Connect components
import GoBackButton from "Components/Buttons/GoBackButton";
import Title from "Components/Titles/Title";
import SubTitle from "Components/Titles/SubTitle";
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
import TitleWithIcon from "Components/Titles/TitleWithIcon";
import InputPhone from "Components/Inputs/InputPhone";
import BlurModal from "Components/Modals/BlurModal";
import ModalInfo from "Components/Modals/ModalInfo";

// Connect styles
import styles from "LoginStyles/LoginPhone.scss";

const LoginPhone = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showError, setShowError] = useState(false);

  const goToVerificationPhone = async () => {
    setLoading(true);
    setModalVisible(false);

    try {

      const apiPhone = Platform.OS === 'ios'
           ? 'http://localhost:3000/register-phone'
           : 'http://192.168.0.107:3000/register-phone';

      const response = await fetch(apiPhone, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phone }),
      });

      const result = await response.json();

      console.log( result.user );

      if ( response.ok ) {

          // console.log( result.user );

        // const phoneTwilio = result.phoneTwilio;
        // navigation.navigate('VerificationPhone', { phone, phoneTwilio });

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

  const handlePhoneNumber = (isValid) => {
    setIsPhoneValid(isValid);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
     <View style={styles.container}>

        <View style={styles.header}>
          <GoBackButton navigation={navigation} />
        </View>

        <Title>
          Отлично! Укажи свой номер телефона!
        </Title>

        <SubTitle>
          Мы позвоним на твой номер.
        </SubTitle>

        <SubTitle colorText="#9d4edd">
          Отвечать на номер не нужно!
        </SubTitle>

        <InputPhone
          style={styles.input}
          onChangeText={setPhone}
          onPhoneNumber={handlePhoneNumber}
          showError={showError}
          setShowError={setShowError}
        />

        <ButtonNameIcon
          buttonText="Регистрация по email"
          handle={goToVerificationEmail}
        />

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

        {showError && (
           <ModalInfo
              message="Номер не должен превышать 20 символов"
              backgroundColor="#ffcc00"
              textColor="#000"
              onHide={() => setShowError(false)}
           />
        )}

        <View style={styles.footer}>
           <TitleWithIcon nameIcon="lock-closed-outline">
             Твой номер телефона никто не увидет в профиле!Будьте спокойны;)
           </TitleWithIcon>

           <ButtonNameIcon
             buttonText="Дальше"
             handle={toggleModal}
             disable={!isPhoneValid}
           />
        </View>
     </View>
  );
};

export default LoginPhone;

