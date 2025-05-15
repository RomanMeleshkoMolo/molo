import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

// ErrorContact Component
const ErrorContact = ({ errorMessage, visible }) => {
  const slideAnim = useRef(new Animated.Value(-160)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -150,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.error, { transform: [{ translateY: slideAnim }] }]}>
      <Text style={styles.errorText}>{errorMessage}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
   error: {
     backgroundColor: "red",
     position: "absolute",
     width: "100%",
     padding: 10,
     zIndex: 99,
     borderRadius: 10
   },
   errorText: {
     color: "#fff",
     fontSize: 16
   }

});

export default ErrorContact;
