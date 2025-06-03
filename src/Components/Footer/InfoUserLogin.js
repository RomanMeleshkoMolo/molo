import React, { useState } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// Connect Navigator
import { useNavigation } from '@react-navigation/native';

import styles from "./styles/InfoUserLogin.scss";

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

        <Text style={styles.footerInfoOne}>
           Мы не передаем твои данные без твоего разрешения
        </Text>
        <Text style={styles.footerInfoTwo}>
           Создавая аккаунт, ты соглашаешься с нашими
           <TouchableOpacity  style={styles.wrapperUser} onPress={() => userConditionInfo()}>
              <Text style={styles.userConditionInfo}> Условиями пользования</Text>
           </TouchableOpacity>

           <TouchableOpacity style={styles.wrapperUser} onPress={() => userPoliticoInfo()}>
             <Text style={styles.userConditionInfo}> Политикой конфиденциальности</Text>
           </TouchableOpacity>
        </Text>

     </View>
  );
};

export default InfoUserLogin;
