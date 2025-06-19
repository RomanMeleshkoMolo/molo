// import React, { useEffect, useState } from 'react';
// import { View, Alert, Text } from 'react-native';
//
// // Connect components
// import GoBackButton from "Components/Buttons/GoBackButton";
// import Title from "Components/Titles/Title";
// import SubTitle from "Components/Titles/SubTitle";
// import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
// import Input from "Components/Inputs/Input";
//
// // Connect styles
// import styles from "./styles/VerificationPhone.scss";
//
// const VerificationPhone = ({ navigation, route }) => {
//   const [text, setText] = useState('');
//   const [userCode, setUserCode] = useState('');
//   const [errorUserCode, setErrorUserCode] = useState(false);
//   const [isCodeValid, setIsCodeValid] = useState(false);
//   const [lastSixDigits, setLastSixDigits] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalColor, setModalColor] = useState('red');
//
//   useEffect(() => {
//     if (route.params?.phone) {
//       setText(route.params.phone);
//
//       // Получаем последние 6 цифр номера
//       const digits = route.params.phoneTwilio.replace(/\D/g, '').slice(-6);
//       setLastSixDigits(digits);
//     }
//   }, [route.params]);
//
//   const goBack = () => {
//     navigation.goBack();
//   };
//
//   const verificationCode = () => {
//      if (userCode === lastSixDigits) {
//         setModalColor('green');
//         setErrorUserCode(true);
//         Alert.alert("Number is correct!");
//      } else {
//         setModalColor('red');
//         setErrorUserCode(true);
//         Alert.alert("Number no correct!!!");
//     }
//   };
//
//   const handleValidEmail = (isValid) => {
//     setIsCodeValid(isValid);
//   };
//
//   const handleUserCode = (input) => {
//     setUserCode(input);
//   };
//
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <GoBackButton navigation={navigation} />
//       </View>
//
//       <Title>Теперь нам нужно убедиться что полученный код принадлежит тебе</Title>
//       <SubTitle>Введи последние 6 цифр в поле ниже:)</SubTitle>
//       <SubTitle style={styles.subTitle}>{`${text}`}</SubTitle>
//
//       <Input
//         style={styles.input}
//         onValidEmail={handleValidEmail}
//         userCode={handleUserCode}
//         errorUser={errorUserCode}
//         modalColor={modalColor}
//       />
//
//       <Text style={styles.link} onPress={goBack}>
//         Не получил звонок?
//       </Text>
//
//       <View style={styles.footer}>
//         <ButtonNameIcon
//           buttonText="Дальше"
//           handle={verificationCode}
//           disable={!isCodeValid}
//         />
//       </View>
//     </View>
//   );
// };
//
// export default VerificationPhone;
//
//




import React, { useEffect, useState } from 'react';
import {View, Text, Alert} from 'react-native';

// Connect components
import GoBackButton from "Components/Buttons/GoBackButton";
import Title from "Components/Titles/Title";
import SubTitle from "Components/Titles/SubTitle";
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
import Input from "Components/Inputs/Input";

// Connect styles
import styles from "./styles/VerificationPhone.scss";

const VerificationPhone = ({ navigation, route }) => {
  const [text, setText] = useState('');
  const [userCode, setUserCode] = useState('');
  const [errorUserCode, setErrorUserCode] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [lastSixDigits, setLastSixDigits] = useState('');
  const [modalColor, setModalColor] = useState('red');
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    if (route.params?.phone) {
      setText(route.params.phone);

      // Получаем последние 6 цифр номера
      const digits = route.params.phoneTwilio.replace(/\D/g, '').slice(-6);
      setLastSixDigits(digits);
    }
  }, [route.params]);

  const goBack = () => {
    navigation.goBack();
  };

  const verificationCode = () => {
    if (userCode === lastSixDigits) {
      setModalColor('#a7c957');
      setModalText("Код верный");
      setErrorUserCode(true);

    } else {
      setModalColor('#d62828');
      setModalText("Введенный неверный код!");
      setErrorUserCode(true);
    }
  };

  const handleValidEmail = (isValid) => {
    setIsCodeValid(isValid);
  };

  const handleUserCode = (input) => {
    setUserCode(input);
  };

  return (
     <View style={styles.container}>

        <View style={styles.header}>
          <GoBackButton navigation={navigation} />
        </View>

        <Title>
           Теперь нам нужно убедиться что полученный код принадлежит тебе
        </Title>

        <SubTitle>
           Введи последние 6 цифр в поле ниже:)
        </SubTitle>

        <SubTitle
           style={styles.subTitle}
        >{`${text}`}
        </SubTitle>

        <Input
           style={styles.input}
           onValidEmail={handleValidEmail}
           userCode={handleUserCode}
           errorUser={errorUserCode}
           modalColor={modalColor}
           modalText={modalText}
           setErrorUserCode={setErrorUserCode} // Pass the setter to reset the error
        />

        <Text style={styles.link} onPress={goBack}>
           Не получил звонок?
        </Text>

        <View style={styles.footer}>
           <ButtonNameIcon
             buttonText="Дальше"
             handle={verificationCode}
             disable={!isCodeValid}
           />
        </View>

     </View>
  );
};

export default VerificationPhone;

