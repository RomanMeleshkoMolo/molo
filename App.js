/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import React from 'react';
// import {
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';
//
// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
//
// import { NavigationContainer } from '@react-navigation/native';
//
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// const Stack = createNativeStackNavigator();
// import { enableScreens } from 'react-native-screens';
// enableScreens();
//
// import Login from "./src/Pages/Login";
//
// function App() {
//
//   return (
//
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
//           <Stack.Screen
//            name="Login"
//            component={Login}
//            />
//
//         </Stack.Navigator>
//       </NavigationContainer>
//   );
// }
//
// const styles = StyleSheet.create({
//
// });
//
// export default App;







import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import {Provider} from "react-native-paper";


// Pages
import Login from "./src/Pages/Login/Login";
import Phone from "./src/Pages/Phone";
import Account from "./src/Pages/Account";
import MainNavi from "./src/Pages/MainNavi";
import Information from "./src/Pages/Information";

import UserConditionInfo from "./src/Pages/Login/UserConditionInfo";
import UserPoliticoInfo from "./src/Pages/Login/UserPoliticoInfo";
import LoginEmail from "./src/Pages/Login/LoginEmail";
import LoginPhone from "./src/Pages/Login/LoginPhone";

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

