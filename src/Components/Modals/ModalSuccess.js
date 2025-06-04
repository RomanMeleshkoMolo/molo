import React, { useEffect, useRef } from 'react';
import { Animated, Text, Dimensions, View } from 'react-native';

// const { width } = Dimensions.get('window');

// Connect styles
import styles from "./styles/ModalSuccess.scss";

const ModalSuccess = ({ message, onHide }) => {
  const slideAnim = useRef(new Animated.Value(-200)).current; // стартовая позиция за верхней границей
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Анимация появления
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -150, // позиция по вертикали (от нижней границы)
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Автоматическое скрытие через 2 секунды
    const timeout = setTimeout(() => {
      // Анимация скрытия
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -200,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onHide) onHide();
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [slideAnim, opacityAnim, onHide]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

export default ModalSuccess;
