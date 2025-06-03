import React from 'react';
import { View, Text } from 'react-native';

// Connect styles
import styles from "./styles/TitleWithIcon.scss";

// Connect Components
import Icon from "react-native-vector-icons/Ionicons";

const TitleWithIcon = ({ children, nameIcon }) => {

   return (
      <View>

         <View style={styles.footerInfo}>
            <Icon name={ nameIcon } size={ 20 } />
            <Text style={styles.footerText}>{ children }</Text>
         </View>

      </View>
   );
}

export default TitleWithIcon;
