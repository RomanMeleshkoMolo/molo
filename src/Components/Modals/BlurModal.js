import React from 'react';
import {Modal, View, TouchableWithoutFeedback } from 'react-native';

import styles from "./styles/BlurModal.scss";

const BlurModal = ({ visible, onClose, children }) => {

  return (
     <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={onClose}
     >
        {/* Обертка для закрытия при клике на фон */}
        <TouchableWithoutFeedback onPress={onClose}>
           <View style={styles.background}>
              {/* Область с содержимым */}

              <TouchableWithoutFeedback>
                 <View style={styles.contentContainer}>
                   {children}
                 </View>
              </TouchableWithoutFeedback>
           </View>
        </TouchableWithoutFeedback>
     </Modal>
  );
};

export default BlurModal;
