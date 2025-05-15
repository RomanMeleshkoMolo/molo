// Component from Chat GPT

import React, { useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { Endpoint } from 'react-native-pjsip';

const SipClient = () => {
  const endpoint = new Endpoint();
  const state = endpoint.state;

  useEffect(() => {
    const start = async () => {
      await endpoint.start();
      const accounts = await endpoint.getAccounts();

      if (accounts.length === 0) {
        await endpoint.createAccount({
          username: '201', // Измените на нужный номер
          domain: '89.218.64.54',
          realm: 'ti',
          password: 'i8ejjgh6q37x2i',
          displayName: 'User 201',
          proxy: null,
          transport: 'UDP', // Или 'TCP' в зависимости от настроек вашего сервера
          regServer: '',
          regTimeout: 3600,
          headers: {
            'User-Agent': 'ReactNativePjSip',
          },
        });
      }
    };

    start();

    return () => {
      endpoint.stop();
    };
  }, [endpoint]);

  const handleRegister = async () => {
    const accounts = await endpoint.getAccounts();
    if (accounts.length > 0) {
      await endpoint.registerAccount(accounts[0].id);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>SIP Client for OS4000</Text>
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default SipClient;
