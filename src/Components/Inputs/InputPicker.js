import React, { forwardRef } from 'react';
import { TextInput, View, Text } from 'react-native';

// Connect styles
import styles from "InputStyles/InputPicker.scss";

// import styles from './InputPicker.scss'; // под твой сборщик SCSS для RN

// InputPicker: обертка над TextInput, поддерживает реф
const InputPicker = forwardRef((props, ref) => {
  const {
    style,
    inputStyle,
    placeholder,
    value,
    onChangeText,
    keyboardType,
    maxLength,
    secureTextEntry,
    onSubmitEditing,
    returnKeyType,
    placeholderTextColor,
    ...rest
  } = props;

  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        style={[styles.input, inputStyle, style]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        placeholderTextColor={placeholderTextColor}
        {...rest}
      />
    </View>
  );
});

export default InputPicker;
