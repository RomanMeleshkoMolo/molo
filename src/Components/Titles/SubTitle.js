import React from 'react';
import {View, Text, Platform} from 'react-native';

// Connect styles
import styles from "TitleStyles/SubTitle.scss";

const SubTitle = ({ style, children, colorText } ) => {

  // Styles for Ios or Android
  const subTitleStyles = Platform.OS === 'ios' ?
      styles.subTitleIos : styles.subTitle;

  const textStyle = {
    color: colorText
  };

   return (
      <View style={styles.container}>

         <Text style={[styles.title, textStyle, subTitleStyles, style]}>
            {children}
         </Text>

      </View>
   );
}

export default SubTitle;
