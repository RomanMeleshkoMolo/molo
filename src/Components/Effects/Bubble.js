// import React, { useEffect } from 'react';
// import {View, StyleSheet, Dimensions, Animated, Text} from 'react-native';
//
// const { width, height } = Dimensions.get('window');
//
// const Bubble = () => {
//   const createAnimatedBubble = (count) => {
//     const bubbles = [];
//     for (let i = 0; i < count; i++) {
//       const size = Math.random() * 60 + 40;
//       const opacity = Math.random() * 0.9 + 0.1;
//       const xPosition = Math.random() * width;
//       const animatedValue = new Animated.Value(height);
//
//       useEffect(() => {
//         Animated.timing(animatedValue, {
//           toValue: -size,
//           duration: 200 + Math.random() * 1000,
//           useNativeDriver: true,
//         }).start();
//       }, [animatedValue]);
//
//       bubbles.push(
//         <Animated.View
//           key={i}
//           style={[
//             styles.bubble,
//             {
//               width: size,
//               height: size,
//               borderRadius: size / 2,
//               backgroundColor: `rgba(4, 150, 255, ${opacity})`,
//               left: xPosition,
//               transform: [{ translateY: animatedValue }],
//             },
//           ]}
//         />
//       );
//     }
//     return bubbles;
//   };
//
//   return (
//     <View style={styles.container}>
//      <Text>
//         <View style={styles.bubblesContainer}>
//           {createAnimatedBubble(50)}
//         </View>
//      </Text>
//   </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'absolute',
//     backgroundColor: '#f0f0f0',
//   },
//   bubblesContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   bubble: {
//     position: 'absolute',
//   },
// });
//
// export default Bubble;


// import React, { useEffect } from 'react';
// import { View, StyleSheet, Dimensions, Animated, Text } from 'react-native';
//
// const { width, height } = Dimensions.get('window');
//
// const Bubble = () => {
//   const createAnimatedBubble = (count) => {
//     const bubbles = [];
//     for (let i = 0; i < count; i++) {
//       const size = Math.random() * 60 + 40;
//       const opacity = Math.random() * 0.9 + 0.1;
//       const xPosition = Math.random() * width;
//       const animatedValue = new Animated.Value(-size);
//
//       useEffect(() => {
//         Animated.timing(animatedValue, {
//           toValue: -25,
//           duration: 500 + Math.random() * 500,
//           useNativeDriver: true,
//         }).start();
//       }, [animatedValue]);
//
//       bubbles.push(
//         <Animated.View
//           key={i}
//           style={[
//             styles.bubble,
//             {
//               width: size,
//               height: size,
//               borderRadius: size / 2,
//               backgroundColor: `rgba(4, 150, 255, ${opacity})`,
//               left: xPosition,
//               transform: [{ translateY: animatedValue }],
//             },
//           ]}
//         />
//       );
//     }
//     return bubbles;
//   };
//
//   return (
//     <View style={styles.container}>
//       <View style={styles.bubblesContainer}>
//         {createAnimatedBubble(50)}
//       </View>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'absolute',
//     backgroundColor: '#f0f0f0',
//   },
//   bubblesContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   bubble: {
//     position: 'absolute',
//   },
// });
//
// export default Bubble;



// import React, { useEffect } from 'react';
// import { View, StyleSheet, Dimensions, Animated } from 'react-native';
//
// const { width, height } = Dimensions.get('window');
//
// const Bubble = () => {
//   const createAnimatedBubble = (count) => {
//     const bubbles = [];
//     for (let i = 0; i < count; i++) {
//       const size = Math.random() * 60 + 40;
//       const opacity = Math.random() * 0.9 + 0.1;
//       const xPosition = Math.random() * width;
//       const yPosition = Math.random() * height;
//       const animatedValue = new Animated.Value(0);
//
//       useEffect(() => {
//         Animated.timing(animatedValue, {
//           toValue: 1,
//           duration: 1000,
//           useNativeDriver: true,
//         }).start();
//       }, [animatedValue]);
//
//       bubbles.push(
//         <Animated.View
//           key={i}
//           style={[
//             styles.bubble,
//             {
//               width: size,
//               height: size,
//               borderRadius: size / 2,
//               backgroundColor: `rgba(4, 150, 255, ${opacity})`,
//               left: xPosition,
//               top: yPosition,
//               opacity: animatedValue,
//             },
//           ]}
//         />
//       );
//     }
//     return bubbles;
//   };
//
//   return (
//     <View style={styles.container}>
//       {createAnimatedBubble(10)}
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'transparent',
//     zIndex: -1
//   },
//   bubble: {
//     position: 'absolute',
//   },
// });
//
// export default Bubble;


// import React, { useEffect } from 'react';
// import { View, StyleSheet, Dimensions, Animated } from 'react-native';
//
// const { width, height } = Dimensions.get('window');
//
// const Bubble = () => {
//   const createAnimatedBubble = (count) => {
//     const bubbles = [];
//     for (let i = 0; i < count; i++) {
//       const size = Math.random() * 60 + 40;
//       const opacity = Math.random() * 0.9 + 0.1;
//       const xPosition = Math.random() * width;
//       const yPosition = Math.random() * height;
//       const animatedValue = new Animated.Value(0);
//
//       useEffect(() => {
//         Animated.timing(animatedValue, {
//           toValue: 1,
//           duration: 500,
//           useNativeDriver: true,
//         }).start();
//       }, [animatedValue]);
//
//       const animatedStyle = {
//         transform: [
//           {
//             scale: animatedValue,
//           },
//         ],
//         opacity: animatedValue,
//       };
//
//       bubbles.push(
//         <Animated.View
//           key={i}
//           style={[
//             styles.bubble,
//             animatedStyle,
//             {
//               width: size,
//               height: size,
//               borderRadius: size / 2,
//               backgroundColor: `rgba(4, 150, 255, ${opacity})`,
//               left: xPosition,
//               top: yPosition,
//             },
//           ]}
//         />
//       );
//     }
//     return bubbles;
//   };
//
//   return (
//     <View style={styles.container}>
//       {createAnimatedBubble(10)}
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'transparent',
//     zIndex: -1
//   },
//   bubble: {
//     position: 'absolute',
//   },
// });
//
// export default Bubble;




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
          duration: 500,
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


