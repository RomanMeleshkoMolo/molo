import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

const Bubble = () => {
  const createAnimatedBubble = (count) => {
    const bubbles = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 60 + 40;
      const opacity = Math.random() * 0.2 + 0.1;
      const initialX = Math.random() * width;
      const initialY = Math.random() * height;
      const animatedScale = new Animated.Value(0);
      const animatedX = new Animated.Value(0);
      const animatedY = new Animated.Value(0);

      useEffect(() => {
        Animated.timing(animatedScale, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }).start(() => {
          const floatAnimation = () => {
            Animated.parallel([
              Animated.timing(animatedX, {
                toValue: Math.random() * width - initialX,
                duration: 50000,
                useNativeDriver: true,
              }),
              Animated.timing(animatedY, {
                toValue: Math.random() * height - initialY,
                duration: 50000,
                useNativeDriver: true,
              }),
            ]).start(() => floatAnimation());
          };

          floatAnimation();
        });
      }, [animatedScale, animatedX, animatedY, initialX, initialY]);

      const animatedStyle = {
        transform: [
          { scale: animatedScale },
          { translateX: animatedX },
          { translateY: animatedY },
        ],
        opacity: animatedScale,
      };

      bubbles.push(
        <Animated.View
          testID="bubble"
          key={i}
          style={[
            styles.bubble,
            animatedStyle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: `rgba(4, 150, 255, ${opacity})`,
              left: initialX,
              top: initialY,
            },
          ]}
        />
      );
    }
    return bubbles;
  };

  return (
    <View style={styles.container}>
      {createAnimatedBubble(10)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: -1
  },
  bubble: {
    position: 'absolute',
  },
});

export default Bubble;


