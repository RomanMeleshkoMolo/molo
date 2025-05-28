import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Connect Global Styles
import { globalStyles } from "../../Styles/globalStyles";

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

const styles = StyleSheet.create({

  footerInfo: {
     flexDirection: 'row',
     alignItems: 'center',
     paddingHorizontal: 20,
  },
  footerText: {
     textAlign: "center",
     paddingHorizontal: 20,
     fontSize: 12,
     fontFamily: "Montserrat-Regular"
  }

})


export default TitleWithIcon;
