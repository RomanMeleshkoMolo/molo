// import React, { useEffect } from 'react';
// import { View, Text } from 'react-native';
// import { UserAgent, Registerer, RegistererState } from 'sip.js';
//
// const SipConnect = () => {
//   useEffect(() => {
//     // Конфигурация SIP
//     const uri = 'sip:202@89.218.64.54';
//     const transportOptions = {
//       server: 'tcp://89.218.64.54:5060',
//       traceSip: true,
//     };
//
//     const userAgentOptions = {
//       uri,
//       transportOptions,
//       authorizationUsername: '202',
//       authorizationPassword: 'i8ejjgh6q37x2i',
//       realm: 'ti',
//     };
//
//     // Создаем User Agent
//     const userAgent = new UserAgent(userAgentOptions);
//
//     // Обработчик событий
//     userAgent.on('registered', () => {
//       console.log('Registered with SIP server');
//     });
//
//     userAgent.on('unregistered', () => {
//       console.log('Unregistered from SIP server');
//     });
//
//     userAgent.on('registrationFailed', (e) => {
//       console.log('Registration failed', e);
//     });
//
//     userAgent.on('invite', (session) => {
//       session.accept();
//       console.log('Incoming call accepted');
//     });
//
//     // Запускаем User Agent и регистрируемся на сервере
//     userAgent.start().then(() => {
//       const registerer = new Registerer(userAgent);
//       registerer.stateChange.addListener((state) => {
//         if (state === RegistererState.Registered) {
//           console.log('Successfully registered');
//         } else if (state === RegistererState.Unregistered) {
//           console.log('Successfully unregistered');
//         } else if (state === RegistererState.Failed) {
//           console.log('Registration failed');
//         }
//       });
//
//       registerer.register();
//     });
//
//     // Завершаем User Agent при размонтировании компонента
//     return () => {
//       userAgent.stop();
//     };
//   }, []);
//
//   return (
//     <View>
//       <Text>SIP Client Connected to OS4000</Text>
//     </View>
//   );
// };
//
// export default SipConnect;






// import React, { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';
// import dgram from 'react-native-udp';
//
// const SipConnect = () => {
//   const [connected, setConnected] = useState(false);
//
//   useEffect(() => {
//     // Создаем UDP сокет
//     const socket = dgram.createSocket('udp4');
//
//     socket.bind(5060, '89.218.64.54', (err) => {
//       if (err) throw err;
//       console.log('Socket bound');
//       setConnected(true);
//     });
//
//     socket.on('message', (msg, rinfo) => {
//       console.log(`Message from ${rinfo.address}:${rinfo.port} - ${msg}`);
//       // Здесь вы можете обработать входящие SIP сообщения
//     });
//
//     socket.on('error', (err) => {
//       console.log(`Socket error:\n${err.stack}`);
//       socket.close();
//       setConnected(false);
//     });
//
//     socket.on('close', () => {
//       console.log('Socket closed');
//       setConnected(false);
//     });
//
//     // Пример отправки SIP сообщения REGISTER
//     const sendRegister = () => {
//       const message = [
//         'REGISTER sip:89.218.64.54 SIP/2.0',
//         'Via: SIP/2.0/UDP 89.218.64.54:5060;branch=z9hG4bK776asdhds',
//         'Max-Forwards: 70',
//         'To: <sip:202@89.218.64.54>',
//         'From: <sip:202@89.218.64.54>;tag=1928301774',
//         'Call-ID: a84b4c76e66710',
//         'CSeq: 314159 REGISTER',
//         'Contact: <sip:202@89.218.64.54>',
//         'Expires: 3600',
//         'User-Agent: ReactNativeSipClient',
//         'Content-Length: 0',
//         '',
//         '',
//       ].join('\r\n');
//
//       socket.send(message, 0, message.length, 5060, '89.218.64.54', (err) => {
//         if (err) throw err;
//         console.log('REGISTER message sent');
//       });
//     };
//
//     if (connected) {
//       sendRegister();
//     }
//
//     // Закрываем сокет при размонтировании компонента
//     return () => {
//       socket.close();
//     };
//   }, [connected]);
//
//   return (
//     <View>
//       <Text>SIP Client Connected to OS4000</Text>
//     </View>
//   );
// };
//
// export default SipConnect;





// import React, { useEffect } from 'react';
// import { Text, View } from 'react-native';
// import TcpSocket from 'react-native-tcp-socket';
//
// const SipConnect = () => {
//   useEffect(() => {
//     // Создаем TCP клиент
//     const client = TcpSocket.createConnection({
//       host: '89.218.64.54',  // IP-адрес вашего сервера
//       port: 4000,            // Порт вашего сервера
//     }, () => {
//       console.log('Connected to server');
//
//       // Формируем сообщение для аутентификации
//       const authMessage = JSON.stringify({
//         numbers: '201~204',
//         realm: 'ti',
//         password: 'i8ejjgh6q37x2i',
//       });
//
//       // Отправляем аутентификационное сообщение серверу
//       client.write(authMessage);
//     });
//
//     // Обработка данных, полученных от сервера
//     client.on('data', (data) => {
//       console.log('Received: ' + data);
//       // Здесь можно добавить логику обработки ответа от сервера
//     });
//
//     // Обработка ошибок
//     client.on('error', (error) => {
//       console.error('Error: ' + error);
//     });
//
//     // Обработка закрытия соединения
//     client.on('close', () => {
//       console.log('Connection closed');
//     });
//
//     // Очистка при размонтировании компонента
//     return () => {
//       client.destroy();
//     };
//   }, []);
//
//   return (
//     <View>
//       <Text>Connecting to TCP server...</Text>
//     </View>
//   );
// };
//
// export default SipConnect;






// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView } from 'react-native';
// import TcpSocket from 'react-native-tcp-socket';
//
// const SipConnect = () => {
//   const [connected, setConnected] = useState(false);
//   const [log, setLog] = useState('');
//
//   useEffect(() => {
//     // Проверяем, существует ли TcpSocket
//     if (!TcpSocket) {
//       console.error('TcpSocket is not available');
//       setLog('TcpSocket is not available');
//       return;
//     }
//
//     // Создаем TCP сокет
//     const client = TcpSocket.createConnection({ host: '89.218.64.54', port: 5060 }, () => {
//       console.log('Connected to SIP server');
//       setConnected(true);
//       setLog(prevLog => prevLog + '\nConnected to SIP server');
//
//       // Пример отправки SIP сообщения REGISTER
//       const sendRegister = () => {
//         const message = [
//           'REGISTER sip:89.218.64.54 SIP/2.0',
//           'Via: SIP/2.0/TCP 89.218.64.54:5060;branch=z9hG4bK776asdhds',
//           'Max-Forwards: 70',
//           'To: <sip:202@89.218.64.54>',
//           'From: <sip:202@89.218.64.54>;tag=1928301774',
//           'Call-ID: a84b4c76e66710',
//           'CSeq: 314159 REGISTER',
//           'Contact: <sip:202@89.218.64.54>',
//           'Expires: 3600',
//           'User-Agent: ReactNativeSipClient',
//           'Content-Length: 0',
//           '',
//           '',
//         ].join('\r\n');
//
//         client.write(message, () => {
//           console.log('REGISTER message sent');
//           setLog(prevLog => prevLog + '\nREGISTER message sent');
//         });
//       };
//
//       sendRegister();
//     });
//
//     client.on('data', (data) => {
//       console.log('Message received: ' + data);
//       setLog(prevLog => prevLog + '\nMessage received: ' + data);
//       // Здесь вы можете обработать входящие SIP сообщения
//     });
//
//     client.on('error', (error) => {
//       console.log('Error: ' + error);
//       setLog(prevLog => prevLog + '\nError: ' + error);
//       client.destroy();
//       setConnected(false);
//     });
//
//     client.on('close', () => {
//       console.log('Connection closed');
//       setLog(prevLog => prevLog + '\nConnection closed');
//       setConnected(false);
//     });
//
//     // Закрываем сокет при размонтировании компонента
//     return () => {
//       client.destroy();
//     };
//   }, []);
//
//   return (
//     <ScrollView>
//       <View style={{ padding: 20 }}>
//         <Text>SIP Client Connected to OS4000</Text>
//         <Text>{log}</Text>
//       </View>
//     </ScrollView>
//   );
// };
//
// export default SipConnect;





// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import TcpSocket from 'react-native-tcp-socket';
//
// const SipConnect = () => {
//   const [isConnected, setIsConnected] = useState(false);
//   const [response, setResponse] = useState('');
//
//   useEffect(() => {
//     const client = TcpSocket.createConnection({
//       port: 202, // Начальный порт
//       host: '89.218.64.54',
//     }, () => {
//       console.log('Connected to server!');
//       setIsConnected(true);
//
//       // Пример отправки данных для аутентификации
//       const credentials = `Realm/Seczone: ti\nPassw: i8ejjgh6q37x2i\n`;
//       client.write(credentials);
//     });
//
//     client.on('data', (data) => {
//       console.log('Received: ', data.toString());
//       setResponse(data.toString());
//     });
//
//     client.on('error', (error) => {
//       console.error('Error: ', error);
//       setIsConnected(false);
//     });
//
//     client.on('close', () => {
//       console.log('Connection closed!');
//       setIsConnected(false);
//     });
//
//     return () => {
//       client.destroy();
//     };
//   }, []);
//
//   return (
//     <View style={styles.container}>
//       <Text style={styles.status}>
//         {isConnected ? 'Connected to server' : 'Disconnected'}
//       </Text>
//       <Text style={styles.response}>Server Response: {response}</Text>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   status: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   response: {
//     fontSize: 16,
//     marginTop: 10,
//   },
// });
//
// export default SipConnect;






import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Endpoint } from 'react-native-pjsip';

const SipConnect = () => {
  useEffect(() => {
    const endpoint = new Endpoint();
    endpoint.start();

    const config = {
      uri: 'sip:202@89.218.64.54', // Используйте нужный номер из диапазона
      transportType: 'tcp',
      regServer: 'sip:89.218.64.54',
      regTimeout: 60,
      authName: '201', // Используйте нужный номер из диапазона
      password: 'i8ejjgh6q37x2i',
      realm: 'ti',
    };

    endpoint.createAccount(config).then((account) => {
      console.log('Account created:', account);
      alert('Account created!!!!!');

      account.on('registration_changed', (account) => {
        console.log('Registration state changed:', account.state);
      });

      account.on('incoming_call', (call) => {
        console.log('Incoming call:', call);

        // Ответить на вызов
        call.answer();
      });
    });

    // Очистка при размонтировании компонента
    return () => {
      endpoint.stop();
    };
  }, []);

  return (
    <View>
      <Text>SIP Component</Text>
    </View>
  );
};

export default SipConnect;


