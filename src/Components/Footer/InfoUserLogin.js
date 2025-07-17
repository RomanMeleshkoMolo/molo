import React, { useState } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// Connect Navigator
// import { useNavigation } from '@react-navigation/native';

import styles from "FooterStyles/InfoUserLogin.scss";

const InfoUserLogin = ({ navigation }) => {
  // const navigation = useNavigation();

  const userConditionInfo = () => {
      navigation.navigate('UserConditionInfo');
  }

  const userPoliticoInfo = () => {
      navigation.navigate('UserPoliticoInfo');
  }

  return (
     <View style={styles.footerLogin}>

        <Text style={styles.footerInfo}>
           Мы не передаем твои данные без твоего разрешения
        </Text>
        <Text style={styles.footerInfo}>
           Создавая аккаунт, ты соглашаешься с нашими
        </Text>

        <View style={styles.footerInfoUser}>
           <Text style={styles.userConditionInfo}  onPress={() => userConditionInfo()}>Условиями пользования</Text>
        </View>
        <View>
           <Text style={styles.userConditionInfo} onPress={() => userPoliticoInfo()}>Политикой конфиденциальности</Text>
        </View>

     </View>
  );
};

export default InfoUserLogin;
