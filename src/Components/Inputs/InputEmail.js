import React from 'react';
import { View, Text, TextInput, Animated, TouchableOpacity } from 'react-native';

// Connect styles
import styles from "./styles/InputEmail.scss";

const InputEmail = ({ placeholder, onValidEmail, onChangeText }) => {
  const [text, setText] = React.useState('');
  const [error, setError] = React.useState(false);
  const [showSuggestion, setShowSuggestion] = React.useState(false);
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
  }

  // Added gmail.com to  the end of email
  const handleSuggestionClick = () => {
     setText((prevText) => {
        const atIndex = prevText.indexOf('@');
        let newText;
        if (atIndex !== -1) {
          newText = prevText.slice(0, atIndex + 1) + 'gmail.com';
        } else {
          newText = prevText + 'gmail.com';
        }
        handleChangeText(newText);
        return newText;
    });
    setShowSuggestion(false);
  };

  const handleChangeText = (input) => {
     setText(input);
     validateInput(input);

     const trimmedInput = input.trim();
     const isValidEmail = trimmedInput.includes('@') && trimmedInput.endsWith('gmail.com');
     setShowSuggestion(trimmedInput.includes('@') && !isValidEmail);

     if (onValidEmail) {
       onValidEmail( isValidEmail );
     }

     if (onChangeText) {
       onChangeText(input); // Добавьте это
     }
  };

  return (
     <View style={styles.container}>
        <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
           <TextInput
             style={[styles.input, error && styles.inputError]}
             placeholder={placeholder}
             value={text}
             maxLength={30}
             onChangeText={handleChangeText}
             keyboardType="email-address"
             autoFocus={true}
           />
        </Animated.View>
        {error && <Text style={styles.errorText}>Email не должен быть пустым</Text>}
        {showSuggestion && (
           <TouchableOpacity onPress={handleSuggestionClick} style={styles.suggestionTouchable}>
              <View style={styles.suggestionWrapper}>
                <Text style={styles.suggestionText}>gmail.com</Text>
              </View>
           </TouchableOpacity>
        )}
     </View>
  );
};

export default InputEmail;

