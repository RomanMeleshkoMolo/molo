import React, { useEffect } from 'react';
import {View, Text, Alert, Button} from 'react-native';
// import Endpoint from "react-native-pjsip/src/Endpoint";
// import { Endpoint } from 'react-native-pjsip';


const SipComponent = () => {
  useEffect(configuration => {
    const initializePJSIP = async () => {

      let endpoint = new Endpoint();
      let state = await endpoint.start();
      let { accounts, calls, settings, connectivity } = state;

      // Подписка на события
      endpoint.on("registration_changed", (account) => {
        console.log("Registration changed:", account);
        Alert.alert("here");
      });

      endpoint.on("connectivity_changed", (online) => {
        console.log("Connectivity changed:", online);
      });

      endpoint.on("call_received", (call) => {
        console.log("Call received:", call);
      });

      endpoint.on("call_changed", (call) => {
        console.log("Call changed:", call);
      });

      endpoint.on("call_terminated", (call) => {
        console.log("Call terminated:", call);
      });

      // Конфигурация аккаунта
      let configuration = {
        "name": "Roman",
        "username": "203", // Используйте один из номеров
        "domain": "89.218.64.54",
        "password": "i8ejjgh6q37x2i",
        "proxy": null,
        "transport": null, // По умолчанию TCP
        "regServer": null,
        "regTimeout": null,
        "regHeaders": {
          "X-Custom-Header": "Value"
        },
        "regContactParams": ";unique-device-token-id=XXXXXXXXX"
      };

      // Создание аккаунта
      let account = await endpoint.createAccount(configuration);
      console.log("Account created", account);
      Alert.alert( "Account created");

      // endpoint.createAccount().then((account) => {
      //    console.log("Account created", account);
      //    Alert.alert( "Account created");
      // });


      // Пример вызова
      const makeCall = async () => {
        let options = {
          headers: {
            "P-Assserted-Identity": "Header example",
            "X-UA": "React native"
          }
        };

        try {
          let call = await endpoint.makeCall(account, 'sip:204@89.218.64.54', options); // Пример вызова на номер 202
          console.log("Call initiated", call);

          endpoint.addListener("call_changed", (newCall) => {
            if (call.getId() === newCall.getId()) {
              console.log("Our call changed");
            }
          });

          endpoint.addListener("call_terminated", (newCall) => {
            if (call.getId() === newCall.getId()) {
              console.log("Our call terminated");
            }
          });
        } catch (error) {
          console.error("Error making call:", error);
        }
      };

      // Сделать вызов
      makeCall();
    };

    initializePJSIP();
  }, []);

  return (
    <View>
      <Text>SIP Component Initialized</Text>
    </View>
  );
};

export default SipComponent;
