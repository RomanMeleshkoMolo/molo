import React from 'react';
import { View, Text } from 'react-native';

// Connect styles
import styles from "./styles/SubTitle.scss";

const SubTitle = ({ children } ) => {

   return (
      <View>

         <Text style={styles.title}>
            {children}
         </Text>

      </View>
   );
}

export default SubTitle;
