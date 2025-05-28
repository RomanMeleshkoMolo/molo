import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// Connect Icons
import Icon from 'react-native-vector-icons/Ionicons';

// Connect Global Styles
import { globalStyles } from "../../Styles/globalStyles";

// const ButtonNameIcon = ({ leftIcon, rightIcon, iconBtn, buttonText, handle, disable, navigation }) => {
//
//     return (
//
//        <TouchableOpacity style={globalStyles.globalBtn} onPress={handle}>
//           {leftIcon && <Icon name={iconBtn} size={30} style={globalStyles.globalIcon} />}
//           <Text style={globalStyles.globalBtnText}>{ buttonText }</Text>
//           {rightIcon && <Icon name={iconBtn} size={30} style={globalStyles.globalIcon} />}
//        </TouchableOpacity>
//
//     )
//
// };
//
// export default ButtonNameIcon;


const ButtonNameIcon = ({ leftIcon, rightIcon, iconBtn, buttonText, handle, disable }) => {
    return (
        <TouchableOpacity
            style={[
                globalStyles.globalBtn,
                disable && globalStyles.disabledBtn // Add disabled style conditionally
            ]}
            onPress={!disable ? handle : null} // Disable onPress if disable is false
            activeOpacity={disable ? 0.7 : 1} // Adjust opacity based on disable
        >
            {leftIcon && <Icon name={iconBtn} size={30} style={globalStyles.globalIcon} />}
            <Text style={globalStyles.globalBtnText}>{buttonText}</Text>
            {rightIcon && <Icon name={iconBtn} size={30} style={globalStyles.globalIcon} />}
        </TouchableOpacity>
    );
};

export default ButtonNameIcon;
