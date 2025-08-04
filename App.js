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
// import { Provider } from "react-native-paper";

// Connect store from redux
import { Provider } from 'react-redux';
import store from 'redux/store';


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
import VerificationTelegram from "Pages/Login/VerificationTelegram";

import NetworkStatus from "Components/Modals/NetworkStatus";

// Connect AsyncStorage for check Tokens
import AsyncStorage from '@react-native-async-storage/async-storage';

import Orientation from 'react-native-orientation-locker';

enableScreens();

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  // Checking Token and redirect
  useEffect(() => {
     const checkLoginStatus = async () => {
         const registrationUserGoogleState = await AsyncStorage.getItem('registrationUserGoogleState');
         const registrationUserEmailState = await AsyncStorage.getItem('registrationUserEmailState');
         const registrationUserPhoneState = await AsyncStorage.getItem('registrationUserPhoneState');
         const registrationUserTelegramState = await AsyncStorage.getItem('registrationUserTelegramState');

         // await AsyncStorage.removeItem('registrationUserGoogleState');
         // await AsyncStorage.removeItem('registrationUserEmailState');
         // await AsyncStorage.removeItem('registrationUserPhoneState');
         // await AsyncStorage.removeItem('registrationUserTelegramState');


        if ( registrationUserGoogleState ||
             registrationUserEmailState ||
             registrationUserPhoneState ||
             registrationUserTelegramState
        ) {
           setInitialRoute('LoginUserName');
        } else {
           setInitialRoute('Login');
        }

       };

       checkLoginStatus();

       Orientation.lockToPortrait();
  }, []);


  if (!initialRoute) {
    return null; // Или индикатор загрузки
  }

  return (
     <Provider store={store}>
        <SafeAreaProvider>
          <NetworkStatus style={{ margin: 50 }}>
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
                 name="VerificationTelegram"
                 component={VerificationTelegram}
              />
              <Stack.Screen
                 name="LoginUserName"
                 component={LoginUserName}
              />
              </Stack.Navigator>
           </NavigationContainer>
          </NetworkStatus>
        </SafeAreaProvider>
     </Provider>

  );
}

export default App;
