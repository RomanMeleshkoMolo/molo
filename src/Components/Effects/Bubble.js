import React, { useEffect } from 'react';
import {View, StyleSheet, Dimensions, Animated, Text} from 'react-native';

const { width, height } = Dimensions.get('window');

const Bubble = () => {
  const createAnimatedBubble = (count) => {
    const bubbles = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 60 + 40;
      const opacity = Math.random() * 0.9 + 0.1;
      const xPosition = Math.random() * width;
      const animatedValue = new Animated.Value(height);

      useEffect(() => {
        Animated.timing(animatedValue, {
          toValue: -size,
          duration: 200 + Math.random() * 1000,
          useNativeDriver: true,
        }).start();
      }, [animatedValue]);

      bubbles.push(
        <Animated.View
          key={i}
          style={[
            styles.bubble,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: `rgba(4, 150, 255, ${opacity})`,
              left: xPosition,
              transform: [{ translateY: animatedValue }],
            },
          ]}
        />
      );
    }
    return bubbles;
  };

  return (
    <View style={styles.container}>
     <Text>
        <View style={styles.bubblesContainer}>
          {createAnimatedBubble(50)}
        </View>
     </Text>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#f0f0f0',
  },
  bubblesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    position: 'absolute',
  },
});

export default Bubble;
