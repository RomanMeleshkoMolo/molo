import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Connect Global Styles
import { globalStyles } from "../../Styles/globalStyles";

const SubTitle = ({ children } ) => {

   return (
      <View>

         <Text style={styles.title}>
            {children}
         </Text>

      </View>
   );
}

const styles = StyleSheet.create({

  title: {
      fontSize: 12,
      fontFamily: "Montserrat-Regular",
      textAlign: "center",
      padding: 10,
      color: "#565656"
  }

})


export default SubTitle;
