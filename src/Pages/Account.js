// import React from 'react';
// import {View, Text, StyleSheet, Image, Button, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
//
// // Components for page
// import GoBackButton from "../Components/GoBackButton";
//
// const Account = ({ route }) => {
//   const { userData } = route.params || {};
//
//   return (
//      <View style={styles.container}>
//
//         <GoBackButton></GoBackButton>
//
//         <View style={styles.imageContainer}>
//            <Image
//              source={require('../../assets/user.png')} // Замените на URL вашего изображения
//              style={styles.imageUser}
//            />
//         </View>
//         <View style={styles.textContainer}>
//            <Text style={styles.name}>{userData.displayName}</Text>
//            <Text style={styles.title}>Пользователь</Text>
//         </View>
//         <View style={styles.infoUser}>
//
//
//         </View>
//
//
//      </View>
//   );
// };




import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Button, Alert, TouchableOpacity} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components for page
import GoBackButton from "../Components/GoBackButton";
import Icon from "react-native-vector-icons/Ionicons";

const Account = ({ route }) => {
  const { userData } = route.params || {};
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('avatar');
        if (savedImage !== null) {
          setAvatar({ uri: savedImage });

        }
      } catch (error) {
        console.log('Failed to load image from storage', error);
      }
    };

    loadImage();
  }, []);

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setAvatar(source);

        try {
          await AsyncStorage.setItem('avatar', response.assets[0].uri);
        } catch (error) {
          console.log('Failed to save image to storage', error);
        }
      }
    });
  };

   const removeImage = async () => {
    try {
      await AsyncStorage.removeItem('avatar');
      setAvatar(null);
    } catch (error) {
      console.log('Failed to remove image from storage', error);
    }
  };

  return (
     <View style={styles.container}>
        <GoBackButton />

        <View style={styles.imageContainer}>
           <TouchableOpacity onPress={selectImage}>
              <Icon
                style={styles.logoLoad}
                name="camera-reverse" // или 'arrow-forward' или другой подходящий
                size={35}
              />
              <Image
                source={avatar || require('../../assets/user.png')}
                style={styles.imageUser}
              />
           </TouchableOpacity>
           {avatar && (
              <TouchableOpacity style={styles.removeIcon} onPress={removeImage}>
              <Icon name="close-circle" size={35} color="#e26d5c" />
           </TouchableOpacity>
           )}
        </View>
        <View style={styles.textContainer}>
           <Text style={styles.nameUser}>{userData.displayName}</Text>
           <Text style={styles.title}>Пользователь</Text>
        </View>
        <View style={styles.containerUser}>

           <View style={styles.infoUser}>
              <View>
                 <Text style={styles.name}>Логин:</Text>
                 <Text style={styles.name}>Пароль:</Text>
                 <Text style={styles.name}>Аутентификаця:</Text>
                 <Text style={styles.name}>Отображаемое имя:</Text>
              </View>
              <View>
                 <Text style={styles.name}>{userData.login}</Text>
                 <Text style={styles.name}>{userData.password}</Text>
                 <Text style={styles.name}>{userData.authDomain}</Text>
                 <Text style={styles.name}>{userData.displayName}</Text>
              </View>
           </View>

        </View>
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
    backgroundColor: "#e5e5e5"
  },
  imageContainer: {
    marginVertical: 20,
    marginBottom: 30,
    zIndex: 1,
    alignItems: "center"
  },
  imageIcon: {
    width: 40,
    height: 40,
    margin: 10
  },
  imageUser: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textContainer: {
    alignItems: 'center',
    backgroundColor: '#4361ee',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: -50,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingVertical: 10
  },
  nameUser: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10
  },
  title: {
    fontSize: 16,
    color: '#adb5bd',
  },
  containerUser: {

  },
  infoUser: {
     backgroundColor: "#adb5bd",
     flexDirection: 'row',
     alignItems: 'center',
     marginVertical: 10,
     borderRadius: 10,
     padding: 20,
     justifyContent: "space-between",
  },
  logoLoad: {
    position: "absolute",
    zIndex: 5,
    top: -10,
    right: 0
  },
  removeIcon: {
    position: 'absolute',
    top: -10,
    right: 80,
    zIndex: 10,
  },
});

export default Account;






