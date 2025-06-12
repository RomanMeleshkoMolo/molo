import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

// Connect styles
import style from "./styles/GoBackButton.scss";

const GoBackButton = ({ navigation }) => {

  // const goLoginPage = () => {
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'Login' }],
  //   });
  // };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={goBack} style={style.button}>
      <Icon name={'arrow-back-outline'} size={30} />
    </TouchableOpacity>
  );
};

export default GoBackButton;
