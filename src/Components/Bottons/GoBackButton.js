import React from 'react';
import {View, Text, StyleSheet, Image, Button, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GoBackButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/back-button.png')}
              style={styles.imageIcon}
            />
        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({

  imageIcon: {
    width: 40,
    height: 40,
    margin: 10,
  },

});

export default GoBackButton;
