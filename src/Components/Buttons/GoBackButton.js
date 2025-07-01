import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

// Connect styles
import styles from "ButtonStyles/GoBackButton.scss";

const GoBackButton = ({ navigation }) => {

  // Styles for Ios or Android
  const buttonStyles = Platform.OS === 'ios' ?
      styles.buttonIos : styles.button;

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={goBack} style={buttonStyles}>
      <Icon name={'arrow-back-outline'} size={30} />
    </TouchableOpacity>
  );
};

export default GoBackButton;
