import React, { useState } from 'react';
import {View, Text, TextInput, Animated} from 'react-native';

// Connect styles
import styles from "InputStyles/Input.scss";

const Input = ({ style, placeholder, onValid, userCode, autoFocus, keyboardType, userName }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const shakeAnimation = React.useRef(new Animated.Value(0)).current;

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

  const handleChangeText = ( input ) => {
    setText( input );
    validateInput( input );

    if( userName ) {
      userName( input )
    }

    if ( userCode ) {
      userCode( input );
    }

    if ( onValid ) {

      if( input.length >= 6 ) {
        onValid(true);

      }else if ( input.length <= 6 ) {
        onValid(false);
      }

    }
  };

  return (
     <View style={styles.container}>

        <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
           <TextInput
              style={[styles.input, error && styles.inputError, style]}
              placeholder={ placeholder }
              value={ text }
              maxLength={ 30 }
              onChangeText={ handleChangeText }
              onBlur={() => validateInput(text)}
              keyboardType={ keyboardType }
              autoFocus={ autoFocus }
           />
        </Animated.View>
        {error &&
            <Text style={styles.errorText}>Поле не должен быть пустым</Text>
        }

     </View>
  );
};

export default Input;

