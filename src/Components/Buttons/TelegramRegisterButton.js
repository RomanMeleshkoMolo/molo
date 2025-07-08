import React from 'react';
import { Linking } from 'react-native';
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";

const TelegramRegisterButton = () => {
  const handlePress = () => {
    // Мое имя бота
    const botUsername = 'MoloChatBot';
    const url = `https://t.me/${botUsername}`;

    Linking.openURL(url).catch(err => console.error("Ошибка при открытии Telegram", err));
  };

  return (

     <ButtonNameIcon
        leftIcon="true"
        iconBtn="paper-plane-outline"
        // disable={false}
        buttonText="Продолжить c Telegram"
        handle={handlePress}
     ></ButtonNameIcon>

  );
};

export default TelegramRegisterButton;
