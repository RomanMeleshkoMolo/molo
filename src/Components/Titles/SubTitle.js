import React from 'react';
import { View, Text } from 'react-native';

// Connect styles
import styles from "./styles/SubTitle.scss";

const SubTitle = ({ style, children, colorText } ) => {

  const textStyle = {
    color: colorText
  };

   return (
      <View>

         <Text style={[styles.title, textStyle, style]}>
            {children}
         </Text>

      </View>
   );
}

export default SubTitle;
