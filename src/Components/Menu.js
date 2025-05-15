import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Menu = ({userData}) => {
    const navigation = useNavigation();



    return (
     <View style={styles.container}>

        <View style={styles.bigIcon}>
          <Image source={require('../../assets/ic_launcher.png')} style={styles.largeIcon} />
        </View>

        <View>

           <TouchableOpacity
              onPress={() => navigation.navigate('Account', {userData} )} // Укажите нужный экран
           >

           <View style={styles.menuItem}>
              <View style={styles.leftMemuItem}>
                 <Icon name={Platform.OS === 'android' ? 'person-outline' : 'ios-home'} size={30} style={styles.icon} />
                 <Text style={styles.menuText}>Account</Text>
              </View>
              <View style={styles.rightMemuItem}>
                 <Icon
                   name="chevron-forward" // или 'arrow-forward' или другой подходящий
                   size={20}
                 />
              </View>
           </View>

           </TouchableOpacity>

        </View>

        <View>

           <TouchableOpacity
              onPress={() => navigation.navigate('Information')} // Укажите нужный экран
           >

           <View style={styles.menuItem}>
              <View style={styles.leftMemuItem}>
                 <Icon name={Platform.OS === 'android' ? 'information-circle-outline' : 'ios-person'} size={30} style={styles.icon} />
                 <Text style={styles.menuText}>Information</Text>
              </View>
              <View style={styles.rightMemuItem}>
                 <Icon
                    name="chevron-forward" // или 'arrow-forward' или другой подходящий
                    size={20}
                 />
              </View>
           </View>

           </TouchableOpacity>

        </View>

        <View style={styles.menuItem}>
           <View style={styles.leftMemuItem}>
              <Icon name={Platform.OS === 'android' ? 'people-outline' : 'ios-person'} size={30} style={styles.icon} />
              <Text style={styles.menuText}>About us</Text>
           </View>
           <View style={styles.rightMemuItem}>
              <Icon
                 name="chevron-forward" // или 'arrow-forward' или другой подходящий
                 size={20}
              />
           </View>
        </View>

        <View style={styles.menuItem}>
           <View style={styles.leftMemuItem}>
             <Icon name={Platform.OS === 'android' ? 'hammer-outline' : 'ios-settings'} size={30} style={styles.icon} />
             <Text style={styles.menuText}>Settings</Text>
           </View>
           <View style={styles.rightMemuItem}>
              <Icon
                name="chevron-forward" // или 'arrow-forward' или другой подходящий
                size={20}
              />
           </View>
        </View>

     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // backgroundColor: "#e7ecef",
  },
  bigIcon: {
    // flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  largeIcon: {
    width: 70,
    height: 70,
  },
  menuItemContainer: {

  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: "space-between",
    padding: 13,
    paddingHorizontal: 20,
    backgroundColor: "#dee2e6",
    borderRadius: 40
  },

  leftMemuItem: {
    flexDirection: 'row',
  },
  rightMemuItem: {
    borderRadius: 50,
    padding: 5,
    backgroundColor: "#ced4da"
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 18,
  },
});

export default Menu;
