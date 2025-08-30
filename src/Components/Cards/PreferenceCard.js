import React from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';

import PropTypes from 'prop-types';

// Connect Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Connect styles
import styles from "CardsStyles/PreferenceCard.scss";

const PreferenceCard = ({ title, subtitle, icon, selected, onPress, disabled }) => {

    return (
     <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
        disabled && styles.containerDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.left}>
        {!!icon && <Ionicons name={icon} size={22} />}
        <View style={styles.texts}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {!!subtitle && (
            <Text style={styles.subtitle} numberOfLines={2}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>
    </Pressable>
    )

}

PreferenceCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.any, // ImageSource
  selected: PropTypes.bool,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

PreferenceCard.defaultProps = {
  subtitle: undefined,
  icon: undefined,
  selected: false,
  onPress: undefined,
  disabled: false,
};

export default PreferenceCard;
