 /**
 * © [2025] Molo. All rights reserved.
 * Molo is a private development, and all rights are owned by the app's owner.
 */


import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';

// Connect components
import Title from "Components/Titles/Title";
import SubTitle from "Components/Titles/SubTitle";
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
import Input from "Components/Inputs/Input";

// Connect styles
import styles from "LoginStyles/LoginUserName.scss";

const LoginUserName = ({ navigation }) => {
  const [nameUser, setNameUser] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);

  const handleUserNameChange = (name) => {
    setNameUser(name);

    if (name.length > 0) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
  };

  const goToNextPage = () => {
    if (isNameValid) {
      Alert.alert("User Name", nameUser);
      // Navigate to the next page if needed
      // navigation.navigate('NextPage');
    } else {
      Alert.alert("Invalid Name", "Please enter a valid name.");
    }
  };

  // Use effect to replace the current screen
  useEffect(() => {
    // navigation.replace('LoginUserName');

  }, []);

  return (
     <View style={styles.container}>

        <Title>
          Супер! Это первый шаг к знакомству! Как тебя зовут?
        </Title>

        <SubTitle>
          Указаное тобой имя будет отображаться у тебя в профиле
        </SubTitle>

        <Input
          style={styles.input}
          keyboardType='default'
          userName={handleUserNameChange}
        />

        <View style={styles.footer}>
           <ButtonNameIcon
             buttonText="Дальше"
             handle={goToNextPage}
             disable={!isNameValid} // Disable button if name is not valid
           />
        </View>

     </View>
  );
};

export default LoginUserName;
