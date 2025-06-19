// import React, {useEffect} from 'react';
// import {View, Text, TextInput, Animated, Alert} from 'react-native';
//
// // Connect Modal
// import ModalInfo from "Components/Modals/ModalInfo";
//
// // Connect styles
// import styles from "./styles/Input.scss";
//
// const Input = ({ style, placeholder, onValidEmail, userCode, errorUser }) => {
//   const [text, setText] = React.useState('');
//   const [errorUserCode, setErrorUserCode] = React.useState(false);
//   const [error, setError] = React.useState(false);
//   const shakeAnimation = React.useRef(new Animated.Value(0)).current;
//
//   useEffect(() => {
//       setErrorUserCode(errorUser)
//   }, [errorUser]);
//
//   const validateInput = (input) => {
//      if (input.trim() === '') {
//         setError(true);
//         triggerShake();
//
//         setTimeout(() => {
//           setError(false);
//         }, 3000);
//
//      } else {
//        setError(false);
//      }
//   };
//
//   const triggerShake = () => {
//      Animated.sequence([
//         Animated.timing(shakeAnimation, {
//           toValue: 10,
//           duration: 100,
//           useNativeDriver: true,
//         }),
//         Animated.timing(shakeAnimation, {
//           toValue: -10,
//           duration: 100,
//           useNativeDriver: true,
//         }),
//         Animated.timing(shakeAnimation, {
//           toValue: 0,
//           duration: 100,
//           useNativeDriver: true,
//         }),
//      ]).start();
//   }
//
//   const handleChangeText = (input) => {
//      setText(input);
//      validateInput(input);
//
//      if(userCode) {
//         userCode(input);
//      }
//
//      if (onValidEmail) {
//        onValidEmail(input.trim() !== '');
//      }
//
//   };
//
//   return (
//      <View style={styles.container}>
//         <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
//            <TextInput
//               style={[styles.input, error && styles.inputError, style]}
//               placeholder={placeholder}
//               value={text}
//               maxLength={30}
//               onChangeText={handleChangeText}
//               onBlur={() => validateInput(text)}
//               keyboardType="numeric"
//               autoFocus={true}
//            />
//         </Animated.View>
//         {error && <Text style={styles.errorText}>Поле не должен быть пустым</Text>}
//         {errorUserCode && (
//             <ModalInfo
//               message="Введенный неверный код!"
//               backgroundColor="red" // желтый для предупреждения
//               textColor="#000" // черный текст
//               onHide={() => setErrorUserCode(false)}
//             />
//         )}
//      </View>
//   );
// };
//
// export default Input;
//




// import React, {useEffect, useRef, useState} from 'react';
// import { View, TextInput, Animated } from 'react-native';
//
// // Connect Modal
// import ModalInfo from "Components/Modals/ModalInfo";
//
// // Connect styles
// import styles from "./styles/Input.scss";
//
// const Input = ({ style, placeholder, onValidEmail, userCode, errorUser, modalColor }) => {
//   const [text, setText] = useState('');
//   const [errorUserCode, setErrorUserCode] = useState(false);
//   const [error, setError] = useState(false);
//   const shakeAnimation = useRef(new Animated.Value(0)).current;
//
//   useEffect(() => {
//     setErrorUserCode(errorUser);
//   }, [errorUser]);
//
//   const validateInput = (input) => {
//     if (input.trim() === '') {
//       setError(true);
//       triggerShake();
//
//       setTimeout(() => {
//         setError(false);
//       }, 3000);
//     } else {
//       setError(false);
//     }
//   };
//
//   const triggerShake = () => {
//     Animated.sequence([
//       Animated.timing(shakeAnimation, {
//         toValue: 10,
//         duration: 100,
//         useNativeDriver: true,
//       }),
//       Animated.timing(shakeAnimation, {
//         toValue: -10,
//         duration: 100,
//         useNativeDriver: true,
//       }),
//       Animated.timing(shakeAnimation, {
//         toValue: 0,
//         duration: 100,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   };
//
//   const handleChangeText = (input) => {
//     setText(input);
//     validateInput(input);
//
//     if (userCode) {
//       userCode(input);
//     }
//
//     if (onValidEmail) {
//       onValidEmail(input.trim() !== '');
//     }
//   };
//
//   return (
//     <View>
//       <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
//         <TextInput
//           style={[styles.input, error && styles.inputError, style]}
//           placeholder={placeholder}
//           value={text}
//           maxLength={30}
//           onChangeText={handleChangeText}
//           onBlur={() => validateInput(text)}
//           keyboardType="numeric"
//           autoFocus={true}
//         />
//       </Animated.View>
//       {error && <Text>Поле не должен быть пустым</Text>}
//       {errorUserCode && (
//         <ModalInfo
//           message={errorUserCode ? "Введенный неверный код!" : "Код верный!"}
//           backgroundColor={modalColor}
//           textColor="#000"
//           onHide={() => setErrorUserCode(false)}
//         />
//       )}
//     </View>
//   );
// };
//
// export default Input;



import React, { useEffect, useState } from 'react';
import { View, TextInput, Animated } from 'react-native';

// Connect Modal
import ModalInfo from "Components/Modals/ModalInfo";

// Connect styles
import styles from "./styles/Input.scss";

const Input = ({ style, placeholder, onValidEmail, userCode, errorUser, modalColor, setErrorUserCode, modalText }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const shakeAnimation = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (errorUser) {
      setTimeout(() => {
        setErrorUserCode(false); // Reset the errorUserCode after showing the modal
      }, 3000);
    }
  }, [errorUser, setErrorUserCode]);

  const validateInput = (input) => {
    if (input.trim() === '') {
      setError(true);
      triggerShake();

      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      setError(false);
    }
  };

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleChangeText = (input) => {
    setText(input);
    validateInput(input);

    if (userCode) {
      userCode(input);
    }

    if (onValidEmail) {
      onValidEmail(input.trim() !== '');
    }
  };

  return (
     <View>
        <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
           <TextInput
              style={[styles.input, error && styles.inputError, style]}
              placeholder={placeholder}
              value={text}
              maxLength={30}
              onChangeText={handleChangeText}
              onBlur={() => validateInput(text)}
              keyboardType="numeric"
              autoFocus={true}
           />
        </Animated.View>
        {error && <Text>Поле не должен быть пустым</Text>}
        {errorUser && (
           <ModalInfo
              message={modalText}
              backgroundColor={modalColor}
              textColor="#fff"
              onHide={() => setErrorUserCode(false)}
           />
        )}
     </View>
  );
};

export default Input;

