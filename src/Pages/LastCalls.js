import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const LastCalls = () => {
   let navigation;
   return (
   <View style={styles.container}>
     <Text>Это cтраница последние вызовы!</Text>
   </View>
 );
};

const styles = StyleSheet.create({
 container: {
   padding: 10,
   height: '100%',
   backgroundColor: '#e5e5e5',
   borderRadius: 5,
 },
});

export default LastCalls;
