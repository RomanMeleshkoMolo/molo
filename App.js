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

// App.js
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

// Connect store from redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'redux/store';

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
import LoginUserInterest from "Pages/Login/LoginUserInterest";
import LoginUserBirthday from "Pages/Login/LoginUserBirthday";
import LoginUserGender from "Pages/Login/LoginUserGender";
import LoginUserWish from "Pages/Login/LoginUserWish";
import LoginUserLoadPhoto from "Pages/Login/LoginUserLoadPhoto";
import LoginUserLocation from "Pages/Login/LoginUserLocation";

import NetworkStatus from "Components/Modals/NetworkStatus";

// Connect AsyncStorage for check Tokens
import AsyncStorage from '@react-native-async-storage/async-storage';

import Orientation from 'react-native-orientation-locker';

enableScreens();

const Stack = createNativeStackNavigator();

 // Ключи и константы персиста
 const LAST_ROUTE_KEY = '@authFlow:lastRoute';
 const PERSIST_ENABLED_KEY = '@authFlow:persistEnabled';
 const DEFAULT_ROUTE = 'Login';
 const START_ROUTE = 'LoginUserName';

 // Навигационный ref
 export const navigationRef = createNavigationContainerRef();

 // Хелперы для флага персиста
 async function setPersistEnabled(enabled) {
   if (enabled) {
     await AsyncStorage.setItem(PERSIST_ENABLED_KEY, '1');
   } else {
     await AsyncStorage.removeItem(PERSIST_ENABLED_KEY);
     await AsyncStorage.removeItem(LAST_ROUTE_KEY);
   }
 }
 async function getPersistEnabled() {
   const v = await AsyncStorage.getItem(PERSIST_ENABLED_KEY);
   return v === '1';
 }

const App = () => {
  const [initialRoute, setInitialRoute] = useState(DEFAULT_ROUTE);
  const [rehydrated, setRehydrated] = useState(false);
  const persistEnabledRef = useRef(false);

  useEffect(() => {
    Orientation.lockToPortrait();

    const bootstrap = async () => {
      try {
        // 1) Проверяем, включен ли персист (после достижения LoginUserName)
        const persistEnabled = await getPersistEnabled();
        persistEnabledRef.current = persistEnabled;

        // 2) Если персист включен — пробуем восстановить последний маршрут
        if (persistEnabled) {
          const lastRoute = await AsyncStorage.getItem(LAST_ROUTE_KEY);

          if (lastRoute) {
            setInitialRoute(lastRoute);
            setRehydrated(true);
            return;
          }
        }

        // 3) Иначе — стартуем с дефолтного экрана
        setInitialRoute(DEFAULT_ROUTE);
      } catch (e) {
        setInitialRoute(DEFAULT_ROUTE);
      } finally {
        setRehydrated(true);
      }
    };

    bootstrap();
  }, []);

  // Сохраняем текущий маршрут
  const handleNavStateChange = useCallback(async () => {
    try {
      const route = navigationRef.getCurrentRoute();
      const name = route?.name;
      if (!name) return;

      // Если впервые попали на START_ROUTE — включаем персист
      if (name === START_ROUTE && !persistEnabledRef.current) {
        persistEnabledRef.current = true;
        await setPersistEnabled(true);
      }

      // Сохраняем последний маршрут только если персист включен
      if (persistEnabledRef.current) {
        await AsyncStorage.setItem(LAST_ROUTE_KEY, name);
      }
    } catch {
      // no-op
    }
  }, []);

  if (!rehydrated) {
    // Лоадер на время восстановления состояния
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
     <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
           <SafeAreaProvider>
              <NetworkStatus style={{ margin: 50 }}>
                 <NavigationContainer ref={navigationRef} onStateChange={handleNavStateChange}>
                    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{
                         headerShown: false,
                         animation: 'slide_from_right', // push-анима “выталкивания”
                         animationTypeForReplace: 'push', // при replace — тоже push-анима
                         gestureEnabled: true, // свайп-назад на iOS
                         fullScreenSwipeEnabled: true, // полноэкранный свайп-назад (iOS)
                         // presentation: 'card', // по умолчанию “card”, оставим явно
                         }}
                       >

                       <Stack.Screen name="Login" component={Login} />
                       <Stack.Screen name="Phone" component={Phone} />
                       <Stack.Screen name="MainNavi" component={MainNavi} options={{ title: "" }} />
                       <Stack.Screen name="Account" component={Account} />
                       <Stack.Screen name="Information" component={Information} />
                       <Stack.Screen name="UserConditionInfo" component={UserConditionInfo} />
                       <Stack.Screen name="UserPoliticoInfo" component={UserPoliticoInfo} />
                       <Stack.Screen name="LoginEmail" component={LoginEmail} />
                       <Stack.Screen name="LoginPhone" component={LoginPhone} />
                       <Stack.Screen name="CountryCodeSelector" component={CountryCodeSelector} />
                       <Stack.Screen name="VerificationEmail" component={VerificationEmail} />
                       <Stack.Screen name="VerificationPhone" component={VerificationPhone} />
                       <Stack.Screen name="VerificationTelegram" component={VerificationTelegram} />
                       <Stack.Screen name="LoginUserName" component={LoginUserName} />
                       <Stack.Screen name="LoginUserInterest" component={LoginUserInterest} />
                       <Stack.Screen name="LoginUserBirthday" component={LoginUserBirthday} />
                       <Stack.Screen name="LoginUserGender" component={LoginUserGender} />
                       <Stack.Screen name="LoginUserWish" component={LoginUserWish} />
                       <Stack.Screen name="LoginUserLoadPhoto" component={LoginUserLoadPhoto} />
                       <Stack.Screen name="LoginUserLocation" component={LoginUserLocation} />
                    </Stack.Navigator>
                 </NavigationContainer>
              </NetworkStatus>
           </SafeAreaProvider>
        </PersistGate>
     </Provider>
  );
};

export default App;

/*
Подсказки:
- Если нужно сбросить персист (например, при логауте), вызовите:
   await setPersistEnabled(false);
  После этого навигируйте на нужный стартовый экран (например, Login).
*/

