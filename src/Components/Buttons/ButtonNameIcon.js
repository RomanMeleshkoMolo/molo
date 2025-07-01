import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

// Connect Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Connect styles
import styles from "ButtonStyles/ButtonNameIcon.scss";

const ButtonNameIcon = ({ leftIcon, rightIcon, iconBtn, buttonText, handle, disable }) => {
    return (
        <TouchableOpacity
            style={[
                styles.globalBtn,
                disable && styles.disabledBtn // Add disabled style conditionally
            ]}
            onPress={!disable ? handle : null} // Disable onPress if disable is false
            activeOpacity={disable ? 0.7 : 1} // Adjust opacity based on disable
        >
            {leftIcon && <Ionicons name={iconBtn} size={30} />}
            <Text style={styles.globalBtnText}>{buttonText}</Text>
            {rightIcon && <Ionicons name={iconBtn} size={30} />}
        </TouchableOpacity>
    );
};

export default ButtonNameIcon;
