import React from 'react';
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity } from 'react-native';

// Connect Global Styles
import { globalStyles } from "../../Styles/globalStyles";

const Input = ({ placeholder, onValidEmail }) => {
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

     const isValidEmail = input.includes('@') && input.endsWith('gmail.com');
     setShowSuggestion(input.includes('@') && !isValidEmail);

     if (onValidEmail) {
       onValidEmail( isValidEmail );
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
             onBlur={() => validateInput(text)}
             keyboardType="email-address"
           />
        </Animated.View>
        {error && <Text style={styles.errorText}>Email не должен быть пустым</Text>}
        {showSuggestion && (
           <TouchableOpacity onPress={handleSuggestionClick}>
              <View style={styles.suggestionWrapper}>
                <Text style={styles.suggestionText}>gmail.com</Text>
              </View>
           </TouchableOpacity>
        )}
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 50,
    padding: 20,
    fontSize: 16,
    paddingHorizontal: 30,
    fontFamily: "Montserrat-Bold",
  },
  inputError: {
    borderColor: '#d52941',
  },
  errorText: {
    color: '#d52941',
    marginTop: 5,
    textAlign: "center"
  },
  suggestionWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  suggestionText: {
    color: '#5e5e5e',
    padding: 10,
    marginTop: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#c0c0c0",
    borderRadius: 50,
    fontFamily: "Montserrat-Medium",
    alignSelf: 'flex-start',
  },
});

export default Input;

