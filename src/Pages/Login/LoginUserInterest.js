//  /**
//  * © [2025] Molo. All rights reserved.
//  * Molo is a private development, and all rights are owned by the app's owner.
//  */
//
//
// import React, { useEffect, useState } from 'react';
// import {View, Alert, Platform} from 'react-native';
//
// // Connect components
// import Title from "Components/Titles/Title";
// import SubTitle from "Components/Titles/SubTitle";
// import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
// import Input from "Components/Inputs/Input";
//
// // Connect styles
// import styles from "LoginStyles/LoginUserName.scss";
// import {useSelector} from "react-redux";
// import AsyncStorage from "@react-native-async-storage/async-storage";
//
// const LoginUserInterest = async ({navigation}) => {
//
//     const userData = useSelector(state => state.userData);
//     console.log("------form store---------");
//     console.log(userData);
//
//     await AsyncStorage.setItem('registrationUserInterest', 'true');
//
//     // Use effect to replace the current screen
//     useEffect( () => {
//
//
//         // navigation.replace('LoginUserName');
//
//     }, []);
//
//     return (
//         <View style={styles.container}>
//
//             <Title>
//                 Нам важно знать что тебя интересует больше всего
//             </Title>
//
//             <SubTitle>
//                 Выбраный ответ даст больше понимания что тебя интересует и возможность подобрать для тебя людей.
//                 Выбраный ответ ты всегда можеш изменить у себя в профиле.
//             </SubTitle>
//
//
//
//         </View>
//     );
// };
//
// export default LoginUserInterest;



/**
 * © [2025] Molo. All rights reserved.
 * Molo is a private development, and all rights are owned by the app's owner.
 */

import React, {useEffect, useCallback, useState} from 'react';
import { View } from 'react-native';

// Connect components
import Title from "Components/Titles/Title";
import SubTitle from "Components/Titles/SubTitle";
import PreferenceCard from "Components/Cards/PreferenceCard";
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";

// import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
// import Input from "Components/Inputs/Input";

// Connect styles
import styles from "LoginStyles/LoginUserName.scss";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
// import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";

const LAST_ROUTE_KEY = '@authFlow:lastRoute';

const LoginUserInterest = ({ navigation }) => {
  const userData = useSelector(state => state.userData);
  const [selected, setSelected] = useState(false);

  // Один раз при загрузке страницы отмечаем, что пользователь дошёл до этапа интересов
  useEffect(() => {
    AsyncStorage.setItem('registrationUserInterest', 'true').catch(() => {});
  }, []);

  // Каждый раз при фокусе экрана сохраняем его как "последний"
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.setItem(LAST_ROUTE_KEY, 'LoginUserInterest').catch(() => {});
    }, [])
  );

  const goToNextPage = async () => {

      alert("go to page");

  }

  return (
    <View style={styles.container}>
      <Title>
        Нам важно знать, что тебя интересует больше всего
      </Title>

      <SubTitle>
        Выбранный ответ даст больше понимания, что тебя интересует, и возможность подобрать для тебя людей.
        Выбранный ответ ты всегда можешь изменить у себя в профиле.
      </SubTitle>

      {/*<PreferenceCard*/}
      {/*    text="TEST TEST TEST"*/}
      {/*    nameIcon="heart-outline"*/}
      {/*/>*/}

      <PreferenceCard
        title="Ходить на свидания"
        subtitle="Романтика и приятные встречи — всё, что мне нужно."
        icon='heart-outline'
        selected={selected}
        onPress={() => setSelected(s => !s)}
      />

        <ButtonNameIcon
           buttonText="Дальше"
           handle={goToNextPage}
           disable={false}
        />


      {/* Здесь разместите ваши варианты интересов и кнопку продолжения */}
    </View>
  );
};

export default LoginUserInterest;

