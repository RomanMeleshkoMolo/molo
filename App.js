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

import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Provider } from "react-native-paper";


// It is old Pages
import Phone from "./src/Pages/Phone";
import Account from "./src/Pages/Account";
import MainNavi from "./src/Pages/MainNavi";
import Information from "./src/Pages/Information";

// Pages for Molo
import Login from "Pages/Login/Login";
import UserConditionInfo from "Pages/Login/UserConditionInfo";
import UserPoliticoInfo from "Pages/Login/UserPoliticoInfo";
import LoginEmail from "Pages/Login/LoginEmail";
import LoginPhone from "Pages/Login/LoginPhone";
import CountryCodeSelector from "Pages/Login/CountryCodeSelector";
import VerificationEmail from "Pages/Login/VerificationEmail";
import VerificationPhone from "Pages/Login/VerificationPhone";
import LoginUserName from "Pages/Login/LoginUserName";

// Connect AsyncStorage for check Tokens
import AsyncStorage from '@react-native-async-storage/async-storage';

enableScreens();

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  // Checking Token and redirect
  useEffect(() => {
     const checkLoginStatus = async () => {
         const userToken = await AsyncStorage.getItem('userGoogleToken');

         console.log("------ From AsyncStorage ---------");
         console.log( userToken );

         // await AsyncStorage.removeItem('userToken');

        if (userToken) {
           console.log("inside if");
           setInitialRoute('LoginUserName');
        } else {
           setInitialRoute('Login');
        }

       };

       checkLoginStatus();
     }, []);


   if (!initialRoute) {
    return null; // Или индикатор загрузки
  }

  return (
     <Provider>
        <SafeAreaProvider>
           <NavigationContainer>
              <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
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
