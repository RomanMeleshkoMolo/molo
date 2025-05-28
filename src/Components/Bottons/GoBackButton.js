import React from 'react';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";

const GoBackButton = ({ navigation }) => {
    // const navigation = useNavigation();

    const goLoginPage = () => {
       // navigation.navigate('Login');
        navigation.reset({
         index: 0,
         routes: [{ name: 'Login' }],
    })
    }

    return (
        <TouchableWithoutFeedback onPress={goLoginPage}>
            <Icon name={'arrow-back-outline'} size={30}></Icon>
        </TouchableWithoutFeedback>
    )

}

export default GoBackButton;
