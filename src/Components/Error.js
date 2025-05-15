import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Error = ({ isVisible, message }) => {
  const translateY = useRef(new Animated.Value(-100)).current; // Начальное значение выше экрана

  useEffect(() => {
    if (isVisible) {
      // Показать сообщение
      Animated.timing(translateY, {
        toValue: 0, // Перемещаем на верхнюю часть экрана yf
        duration: 300, // Длительность анимации
        useNativeDriver: true,
      }).start();
    } else {
      // Скрыть сообщение
      Animated.timing(translateY, {
        toValue: -100, // Возвращаем обратно
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "red",
    padding: 20,
    zIndex: 999,
  },
  text: {
    color: "#fff",
  },
});

export default Error;
