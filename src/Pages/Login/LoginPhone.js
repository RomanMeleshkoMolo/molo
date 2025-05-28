import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';

// Connect components
import GoBackButton from "../../Components/Bottons/GoBackButton";
import Title from "../../Components/Titles/Title";
import SubTitle from "../../Components/Titles/SubTitle";
import Input from "../../Components/Inputs/Input";
import ButtonNameIcon from "../../Components/Bottons/ButtonNameIcon";
import TitleWithIcon from "../../Components/Titles/TitleWithIcon";

// Connect Global Styles
import { globalStyles } from "../../Styles/globalStyles";

const LoginPhone = ({ navigation }) => {
  const [text, setText] = React.useState('');

  const goToVerification = () => {
     // Alert.alert("Go to Verification page");
       navigation.navigate('LoginEmail');
  }

  return (
     <View style={[styles.container, globalStyles.globalBackground]}>

        <View style={styles.header}>
            <GoBackButton
               navigation={navigation}
            ></GoBackButton>
        </View>

        <Title>Отлично! Укажи свой номер телефона</Title>
        <SubTitle>Мы отправим на него код подтверждения</SubTitle>

        <Input style={styles.input}></Input>

        <ButtonNameIcon
              buttonText="Регистрация по email"
              handle={goToVerification}
        ></ButtonNameIcon>

        <View style={styles.footer}>
           <TitleWithIcon
              nameIcon="lock-closed-outline"
           >
               Твой номер телефона никто не увидет в профиле!Будьте спокойны;)
           </TitleWithIcon>

           <ButtonNameIcon
              buttonText="Дальше"
              disable={true}
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

});

export default LoginPhone;
