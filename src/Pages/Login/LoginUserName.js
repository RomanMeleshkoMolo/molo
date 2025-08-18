 /**
 * © [2025] Molo. All rights reserved.
 * Molo is a private development, and all rights are owned by the app's owner.
 */


import React, { useEffect, useState } from 'react';
import {View, Alert, Platform} from 'react-native';

// Connect components
import Title from "Components/Titles/Title";
import SubTitle from "Components/Titles/SubTitle";
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
import Input from "Components/Inputs/Input";

// Connect styles
import styles from "LoginStyles/LoginUserName.scss";
import {useSelector} from "react-redux";

const LoginUserName = ({ navigation }) => {
  const [nameUser, setNameUser] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);

  const userData = useSelector(state => state.userData);
  console.log("------form store---------");
  console.log( userData );

  const handleUserNameChange = (name) => {
    setNameUser(name);

    if (name.length > 0) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
  };

  // const goToNextPage = () => {
  //   if (isNameValid) {
  //     Alert.alert("User Name", nameUser);
  //     // Navigate to the next page if needed
  //     // navigation.navigate('NextPage');
  //   } else {
  //     Alert.alert("Invalid Name", "Please enter a valid name.");
  //   }
  // };


  const goToNextPage = async () => {

   const apiUrl = Platform.OS === 'ios'
           ? 'http://localhost:3000/updateUserName'
           : 'http://192.168.0.107:3000/updateUserName';


  if (isNameValid) {
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // userId: '1', // Replace with the actual userId
          userId: userData.userId,
          name: nameUser,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user name');
      }

      const updatedUser = await response.json();
      Alert.alert('Success', `User name updated to: ${updatedUser.name}`);

      // Navigate to the next page if needed
      // navigation.navigate('NextPage');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  } else {
    Alert.alert('Invalid Name', 'Please enter a valid name.');
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
