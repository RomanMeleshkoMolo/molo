import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// Connect Navigator
import { useNavigation } from '@react-navigation/native';

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


const styles = StyleSheet.create({

  wrapperUser: {
    paddingHorizontal: 50,
  },

 // Footer
  footerLogin: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    padding: 10,
  },
  footerInfoOne: {
    textAlign: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
  },
  footerInfoTwo: {
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
  },
  userConditionInfo: {
     fontFamily: 'Montserrat-Bold',
     textDecorationLine: 'underline',
  }

})

export default InfoUserLogin;
