// import React, { useState, useEffect } from 'react';
// import {StyleSheet, View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
//
// // Connect AsyncStore
// import AsyncStorage from '@react-native-async-storage/async-storage';
//
// // Connect Components
// import Error from "../Components/Error"
//
// const Login = ({ navigation }) => {
//  const [login, setLogin] = useState('');
//  const [password, setPassword] = useState('');
//  const [authDomain, setAuthDomain] = useState('');
//  const [displayName, setDisplayName] = useState('');
//
//  const [errorVisible, setErrorVisible] = React.useState(false);
//  const [errorMessage, setErrorMessage] = React.useState("Error!!!!");
//
//  const errors = [
//      "логин - обязательно для заполнения.",
//      "пароль - обязательно для заполнения.",
//      "область аутентификации - обязательно для заполнения.",
//      "отображаемое имя - обязательно для заполнения."
//  ]
//
//  const input = [login, password, authDomain, displayName];
//
//  useEffect(() => {
//     const checkExistingAccount = async () => {
//         const storedLogin = await AsyncStorage.getItem('@login');
//         const storedPassword = await AsyncStorage.getItem('@password');
//         const storedAuthDomain = await AsyncStorage.getItem('@authDomain');
//         const storedDisplayName = await AsyncStorage.getItem('@displayName');
//
//         if (storedLogin && storedPassword && storedAuthDomain && storedDisplayName) {
//             // Navigate to Phone page if account exists
//             navigation.navigate('MainNavi');
//         }
//     };
//
//     checkExistingAccount();
// }, [navigation]);
//
//  function validateInputs(inputs) {
//     const errorMessages = [];
//
//     inputs.forEach((value, index) => {
//        if (!value) {
//             errorMessages.push(errors[index]);
//        }
//     });
//
//     return errorMessages;
//  }
//
//  const storeData = async (value) => {
//   try {
//     await AsyncStorage.setItem('@login', login);
//     await AsyncStorage.setItem('@password', password);
//     await AsyncStorage.setItem('@authDomain', authDomain);
//     await AsyncStorage.setItem('@displayName', displayName);
//   } catch (e) {
//     // Ошибка при сохранении
//       alert("Error saved data!");
//   }
// };
//
//  const goToPhoneTest = () => {
//      navigation.navigate('MainNavi');
//  }
//
//  const goToPhone = () => {
//     navigation.reset({
//          index: 0,
//          routes: [{ name: 'MainNavi' }],
//     })
//  }
//
//
//  const handleCreateAccount = () => {
//     const validationErrors = validateInputs(input);
//
//     if (validationErrors.length > 0) {
//        let index = 0;
//
//        const showNextError = () => {
//           if (index < validationErrors.length) {
//              setErrorMessage(validationErrors[index]);
//              setErrorVisible(true);
//              index++;
//              setTimeout(() => {
//                setErrorVisible(false);
//                setTimeout(showNextError, 300);
//              }, 3000);
//           }
//        };
//
//       showNextError();
//     } else {
//       storeData();
//       goToPhone();
//     }
//  };
//
//  return (
//     <View style={styles.container}>
//
//        <Error isVisible={errorVisible} message={errorMessage} />
//
//        <View style={styles.header_logo}>
//           <Image
//              source={require('../../assets/icon.png')}
//              style={styles.logo}
//              resizeMode="contain"
//           />
//        </View>
//
//        <TextInput
//          style={styles.input}
//          value={login}
//          onChangeText={setLogin}
//          placeholder="Введите ваш логин"
//        />
//
//        <TextInput
//          style={styles.input}
//          value={password}
//          onChangeText={setPassword}
//          secureTextEntry
//          placeholder="Введите ваш пароль"
//        />
//
//        <TextInput
//          style={styles.input}
//          value={authDomain}
//          onChangeText={setAuthDomain}
//          placeholder="Введите область аутентификации"
//        />
//
//        <TextInput
//          style={styles.input}
//          value={displayName}
//          onChangeText={setDisplayName}
//          placeholder="Введите отображаемое имя"
//        />
//
//        <TouchableOpacity style={styles.createBtn} onPress={handleCreateAccount}>
//           <Text style={styles.createBtnText}>СОЗДАТЬ</Text>
//        </TouchableOpacity>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     paddingTop: 40,
//     backgroundColor: 'white',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//     height: "100%"
//   },
//   label: {
//     marginBottom: 5,
//     fontSize: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     // borderWidth: 1,
//     borderBottomWidth: 1,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//     borderRadius: 4,
//   },
//
//   createBtn: {
//     padding: 10,
//     marginTop: 10,
//     borderRadius: 10,
//     backgroundColor: "#0c4bea"
//   },
//   createBtnText: {
//     textAlign: "center",
//     color: "#fff"
//   },
//
//   header_text: {
//       fontSize: 35,
//       fontWeight: "500"
//   },
//   header_logo: {
//       display: 'flex',
//       justifyContent: "center",
//       alignItems: "center",
//       paddingVertical: 20
//   },
//   logo: {
//       width: "170",
//       height: "170",
//       borderRadius: 100
//   }
// });
//
//
// export default Login;








import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Alert} from 'react-native';

// Connect Global Styles
import { globalStyles } from "../../Styles/globalStyles";

// Connect Icons
import Icon from 'react-native-vector-icons/Ionicons';

const Login = ({ navigation }) => {
 const [login, setLogin] = useState('');
 const [password, setPassword] = useState('');


 const goToPhoneTest = () => {
     navigation.navigate('MainNavi');
 }

 const goToPhone = () => {
    navigation.reset({
         index: 0,
         routes: [{ name: 'MainNavi' }],
    })
 }


 const handleCreateAccount = () => {
    Alert.alert("Go to Eamil page");
 };

 return (
    <View style={styles.container}>

       <View style={styles.headerLogo}>
          <Image
             source={require('../../../assets/icon.png')}
             style={styles.logo}
             resizeMode="contain"
          />
       </View>




       <TouchableOpacity style={globalStyles.globalBtn} onPress={handleCreateAccount}>
           <Icon name="mail-outline" size={30} style={globalStyles.globalIcon} />
           <Text style={globalStyles.globalBtnText}>Продолжить по email</Text>
       </TouchableOpacity>

       <TouchableOpacity style={globalStyles.globalBtn} onPress={handleCreateAccount}>
           <Icon name="call-outline" size={30} style={globalStyles.globalIcon} />
           <Text style={globalStyles.globalBtnText}>Продолжить по телефону</Text>
       </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: "100%"
  },

  headerLogo: {
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 20
  },
  logo: {
      width: "170",
      height: "170",
      borderRadius: 100
  }

});


export default Login;


