/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

 /**
 * © [2025] Molo. All rights reserved.
 * Molo is a private development, and all rights are owned by the app's owner.
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import {Provider} from "react-native-paper";


// Pages
import Phone from "./src/Pages/Phone";
import Account from "./src/Pages/Account";
import MainNavi from "./src/Pages/MainNavi";
import Information from "./src/Pages/Information";

import Login from "./src/Pages/Login/Login";
import UserConditionInfo from "./src/Pages/Login/UserConditionInfo";
import UserPoliticoInfo from "./src/Pages/Login/UserPoliticoInfo";
import LoginEmail from "./src/Pages/Login/LoginEmail";
import LoginPhone from "./src/Pages/Login/LoginPhone";
import CountryCodeSelector from "./src/Pages/Login/CountryCodeSelector";
import VerificationEmail from "./src/Pages/Login/VerificationEmail";
import VerificationPhone from "./src/Pages/Login/VerificationPhone";
import LoginUserName from "./src/Pages/Login/LoginUserName";

enableScreens();

const Stack = createNativeStackNavigator();

function App() {
  return (
     <Provider>
        <SafeAreaProvider>
           <NavigationContainer>
              <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
              <Stack.Screen
                  name="Login"
                  component={Login}
              />
              <Stack.Screen
                name="Phone"
                component={Phone}
              />
              <Stack.Screen
                name="MainNavi"
                component={MainNavi}
                options={{title: ""}}
              />
              <Stack.Screen
                name="Account"
                component={Account}
              />
              <Stack.Screen
                name="Information"
                component={Information}
              />
              <Stack.Screen
                 name="UserConditionInfo"
                 component={UserConditionInfo}
              />
              <Stack.Screen
                 name="UserPoliticoInfo"
                 component={UserPoliticoInfo}
              />
              <Stack.Screen
                 name="LoginEmail"
                 component={LoginEmail}
              />
              <Stack.Screen
                 name="LoginPhone"
                 component={LoginPhone}
              />
              <Stack.Screen
                 name="CountryCodeSelector"
                 component={CountryCodeSelector}
              />
              <Stack.Screen
                 name="VerificationEmail"
                 component={VerificationEmail}
              />
              <Stack.Screen
                 name="VerificationPhone"
                 component={VerificationPhone}
              />
              <Stack.Screen
                 name="LoginUserName"
                 component={LoginUserName}
              />
          </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
     </Provider>

  );
}

export default App;










// import {Image, StyleSheet, Text, View} from 'react-native';
//
// // Navigation
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import { createStackNavigator } from '@react-navigation/stack';
//
// // Pages
// import Login from "./src/Pages/Login";
// import Phone from "./src/Pages/Phone";
// import MainNavi from "./src/Pages/MainNavi";
//
// const Stack = createNativeStackNavigator();
//
// export default function App() {
//   return (
//
//      <NavigationContainer>
//        {/* screenOptions={{ headerShown: false }} add to <Stack.Navigator initialRouteName="Login"> like attribute  */}
//         <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
//           <Stack.Screen
//            name="Login"
//            component={Login}
//            />
//           <Stack.Screen
//            name="Phone"
//            component={Phone}
//            />
//           <Stack.Screen
//            name="MainNavi"
//            component={MainNavi}
//            options={{title: ""}}
//            />
//         </Stack.Navigator>
//      </NavigationContainer>
//
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//
//   text: {
//     fontSize: 20,
//     color: '#333',
//   },
// });

