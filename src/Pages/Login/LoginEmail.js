import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';

// Connect components
import GoBackButton from "../../Components/Bottons/GoBackButton";
import Title from "../../Components/Titles/Title";
import SubTitle from "../../Components/Titles/SubTitle";
import Input from "../../Components/Inputs/Input";
import ButtonNameIcon from "../../Components/Bottons/ButtonNameIcon";
import TitleWithIcon from "../../Components/Titles/TitleWithIcon";

// Connect Global Styles
import { globalStyles } from "../../Styles/globalStyles";

const LoginEmail = ({ navigation }) => {
  const [text, setText] = React.useState('');
  const [isEmailValid, setIsEmailValid] = React.useState(false);

  const goBack = () => {
       navigation.navigate('LoginPhone');
  }

  const handleValidEmail = ( isValid ) => {
      setIsEmailValid(isValid);
  };

  const goToVerification = () => {
      alert("goooooo!!");
  };



  return (
     <View style={[styles.container, globalStyles.globalBackground]}>

        <View style={styles.header}>
            <GoBackButton
              navigation={navigation}
            ></GoBackButton>
        </View>

        <Title>Супер! Укажи свой email для подтвержения аккаунта</Title>
        <SubTitle>Это необходимо для подтверждения твоего аккаунта</SubTitle>

        <Input
            style={styles.input}
            value={text}
            onValidEmail={handleValidEmail}
        ></Input>

        <ButtonNameIcon
              buttonText="Регистрация по телефону"
              handle={goBack}
        ></ButtonNameIcon>

        <View style={styles.footer}>
           <TitleWithIcon
              nameIcon="lock-closed-outline"
           >
               Мы никому не будем передавать твой email. Ваша безопасность превыше всего!
           </TitleWithIcon>

           <ButtonNameIcon
              buttonText="Дальше"
              handle={goToVerification}
              disable={!isEmailValid}
           ></ButtonNameIcon>
        </View>

     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center"
  },
  input: {
    padding: 50,
    position: "relative"
  },

  footer: {
    justifyContent: 'flex-end',
    marginTop: "auto"
  },
  // footerInfo: {
  //    flexDirection: 'row',
  //    alignItems: 'center',
  //    paddingHorizontal: 20,
  // },
  // footerText: {
  //    textAlign: "center",
  //    paddingHorizontal: 20,
  //    fontSize: 12,
  //    fontFamily: "Montserrat-Regular"
  // }

});

export default LoginEmail;
