import React, {useEffect, useState} from 'react';
import { View, Alert, Text, ActivityIndicator } from 'react-native';

// Connect components
import GoBackButton from "Components/Buttons/GoBackButton";
import Title from "Components/Titles/Title";
import SubTitle from "Components/Titles/SubTitle";
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
import Input from "Components/Inputs/Input";

// Connect styles
import styles from "./styles/VerificationEmail.scss";

const VerificationEmail = ({ navigation, route }) => {
  const [text, setText] = useState('');
  const [code, setCode] = useState('');
  const [ errorUserCode, setErrorUserCode ] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    if (route.params?.email) {
      setText(route.params.email);
    }

    if(route.params?.confirmationCode) {
       setCode(route.params.confirmationCode);
    }
  }, [route.params]);

  const goBack = () => {
      navigation.goBack();
  }

  const verificationCode = () => {

      if( code === userCode) {
          // Перенаправляем на следущюю страницу
          Alert.alert("Number is correct!");
      }else {
          setErrorUserCode( true );
      }

  }

  const handleValidEmail = ( isValid ) => {
      setIsEmailValid(isValid);
  };

  const handleUserCode = ( input ) => {
      setUserCode( input );
  }

  return (
     <View style={[styles.container]}>

        <View style={styles.header}>
          <GoBackButton navigation={navigation} />
        </View>

        <Title>Теперь нам нужно убедиться что полученный код пренадлежит тебе</Title>
        <SubTitle>Мы отправили код подтверждения.Просто введите его ниже и все:)</SubTitle>
        <SubTitle>{`${text}`}</SubTitle>

        <Input
          onValidEmail={handleValidEmail}
          userCode={handleUserCode}
          errorUser={errorUserCode}
        />

        <Text
            style={styles.link}
            onPress={goBack}
        >
            Не получил письмо?
        </Text>

        <View style={styles.footer}>
           <ButtonNameIcon
              buttonText="Дальше"
              handle={verificationCode}
              disable={!isEmailValid}
           />
        </View>

     </View>
  );
};

export default VerificationEmail;
