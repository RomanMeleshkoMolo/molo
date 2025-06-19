import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

// подключение стилей
import styles from "./styles/ModalInfo.scss";

const ModalInfo = ({ message, onHide, backgroundColor, textColor }) => {
  const slideAnim = useRef(new Animated.Value(-200)).current; // стартовая позиция
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // анимация появления
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // автоматическое скрытие через 2 сек
    const timeout = setTimeout(() => {
      // анимация скрытия
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
          backgroundColor: backgroundColor || '#333', // дефолтный цвет
          textColor: textColor || '#333'
        },
      ]}
    >
      <Text style={[styles.text, { color: textColor || '#fff' }]}>{message}</Text>
    </Animated.View>
  );
};

export default ModalInfo;
