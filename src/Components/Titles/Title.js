import React from 'react';
import { View, Text } from 'react-native';

// Connect styles
import styles from "TitleStyles/Title.scss";

const Title = ({ children } ) => {

   return (
      <View>

         <Text style={styles.title}>
            {children}
         </Text>

      </View>
   );
}

export default Title;
