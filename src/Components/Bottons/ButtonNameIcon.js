import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// Connect Icons
import Icon from 'react-native-vector-icons/Ionicons';

// Connect Global Styles
import { globalStyles } from "../../Styles/globalStyles";

const ButtonNameIcon = ({ iconBtn, buttonText, handleCreateAccount, navigation }) => {

    return (

       <TouchableOpacity style={globalStyles.globalBtn} onPress={handleCreateAccount}>
          <Icon name={ iconBtn } size={30} style={globalStyles.globalIcon} />
          <Text style={globalStyles.globalBtnText}>{ buttonText }</Text>
       </TouchableOpacity>

    )

};

export default ButtonNameIcon;
