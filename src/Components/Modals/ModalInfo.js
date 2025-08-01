import React, { useEffect, useRef } from 'react';
import { Animated, Text, Platform } from 'react-native';

// Connect style
import styles from "ModalStyles/ModalInfo.scss";

const ModalInfo = ({ message, onHide, backgroundColor, textColor, time }) => {
  const slideAnim = useRef(new Animated.Value(-200)).current; // Start position
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Show animation
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: Platform.OS === 'ios' ? 40 : 20, // Final position
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-hide after 2 seconds
    const timeout = setTimeout(() => {
      // Hide animation
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
    }, time || 2000);

    return () => clearTimeout(timeout);
  }, [slideAnim, opacityAnim, onHide]);

  return (
     <Animated.View
        style={[
           styles.container,
           {
             transform: [{ translateY: slideAnim }],
             opacity: opacityAnim,
             backgroundColor: backgroundColor || '#333', // Default color
           },
        ]}
     >
        <Text
            style={[styles.text, { color: textColor || '#fff' }]}
        >
          {message}
        </Text>
     </Animated.View>
  );
};

export default ModalInfo;
