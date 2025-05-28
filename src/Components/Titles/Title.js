import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Connect Global Styles
import { globalStyles } from "../../Styles/globalStyles";

const Title = ({ children } ) => {

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
      fontSize: 20,
      fontFamily: "Montserrat-Medium",
      textAlign: "center",
      padding: 10
  }

})


export default Title;
