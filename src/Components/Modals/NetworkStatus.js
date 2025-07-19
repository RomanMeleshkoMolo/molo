import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import ModalInfo from 'Components/Modals/ModalInfo';

const NetworkStatus = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected !== isConnected) {
        setIsConnected(state.isConnected);
        setMessage(state.isConnected ? 'Соединение восстановлено!' : 'Нет подключения к интернету');
        setShowModal(true);

      }
    });

    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  return (
    <View style={{ flex: 1 }}>
      {children}
      {showModal && (
        <ModalInfo
          message={message}
          onHide={() => setShowModal(false)}
          backgroundColor={isConnected ? '#a7c957' : '#ffcc00'} // Green for connected, red for disconnected
          textColor="#333"
          time={10000}
        />
      )}
    </View>
  );
};

export default NetworkStatus;
