import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';

// Connect components
import GoBackButton from "Components/Buttons/GoBackButton";
import Title from "Components/Titles/Title";
import SubTitle from "Components/Titles/SubTitle";
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
import Input from "Components/Inputs/Input";

// Connect styles
import styles from "LoginStyles/VerificationEmail.scss";

// Connect Navigation
import { useNavigation } from '@react-navigation/native';

// Connect AsyncStorage for check Tokens
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerificationEmail = ({ route }) => {
  const navigation = useNavigation();

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

  const verificationCodeUser = async () => {

     if( code === userCode ) {

        await AsyncStorage.setItem('registrationUserEmailState', 'true');

        // Go to other page
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginUserName' }],
        });

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

        <Title>
            Теперь нам нужно убедиться что полученный код пренадлежит тебе
        </Title>
        <SubTitle style={styles.subTitle}>
            Мы отправили код подтверждения.Просто введите его ниже и все:)
        </SubTitle>
        <SubTitle style={styles.subTitle}>
            {`${text}`}
        </SubTitle>

        <Input
          onValid={handleValidEmail}
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
              handle={verificationCodeUser}
              disable={!isEmailValid}
           />
        </View>

     </View>
  );
};

export default VerificationEmail;
