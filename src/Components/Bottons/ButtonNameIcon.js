import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';

// Connect Icons
import Icon from 'react-native-vector-icons/Ionicons';

// Connect styles
import style from "./styles/ButtonNameIcon.scss";

const ButtonNameIcon = ({ leftIcon, rightIcon, iconBtn, buttonText, handle, disable }) => {
    return (
        <TouchableOpacity
            style={[
                style.globalBtn,
                disable && style.disabledBtn // Add disabled style conditionally
            ]}
            onPress={!disable ? handle : null} // Disable onPress if disable is false
            activeOpacity={disable ? 0.7 : 1} // Adjust opacity based on disable
        >
            {leftIcon && <Icon name={iconBtn} size={30} />}
            <Text style={style.globalBtnText}>{buttonText}</Text>
            {rightIcon && <Icon name={iconBtn} size={30} />}
        </TouchableOpacity>
    );
};

export default ButtonNameIcon;
