import React, { useState } from 'react';
import { View, Text, TextInput, Modal as RNModal, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ErrorContact from "./ErrorContact";

const ModalContact = ({ modalContactVisible, setModalContactVisible }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const errors = [
    "Name - обязательно для заполнения.",
    "Phone Number - обязательно для заполнения.",
  ];

  const saveContact = async () => {
    if (!name.trim() || !phoneNumber.trim()) {
      setErrorMessage(!name.trim() ? errors[0] : errors[1]);
      setErrorVisible(true);
      setTimeout(() => setErrorVisible(false), 3000); // Hide after 3 seconds
      return;
    }

    try {
      const existingContacts = await AsyncStorage.getItem('contacts');
      const contacts = existingContacts ? JSON.parse(existingContacts) : [];
      const newContact = { name, phoneNumber };
      contacts.push(newContact);
      await AsyncStorage.setItem('contacts', JSON.stringify(contacts));

      // Очищаем input
      setName('');
      setPhoneNumber('');

      setModalContactVisible(false);
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  const closeModal = () => {
     // Clear inputs
    setName('');
    setPhoneNumber('');

    setModalContactVisible(false);
  }

  return (
     <RNModal
        animationType="slide"
        transparent={true}
        visible={modalContactVisible}
        onRequestClose={() => {
          setModalContactVisible(!modalContactVisible);
        }}
        >

        <View style={styles.modalView}>

           <ErrorContact errorMessage={errorMessage} visible={errorVisible} />

           <Text style={styles.header}>Add Contact</Text>

           <TextInput
             style={styles.input}
             placeholder="Name"
             value={name}
             onChangeText={setName}
           />

           <TextInput
             style={styles.input}
             placeholder="Phone Number"
             value={phoneNumber}
             onChangeText={setPhoneNumber}
             keyboardType="phone-pad"
             maxLength={13}
           />

           <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.saveBtn} onPress={saveContact}>
                 <Text style={styles.saveBtnText}>SAVE CONTACT</Text>
              </TouchableOpacity>


              <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
                 <Text style={styles.closeModal}>CLOSE</Text>
              </TouchableOpacity>

           </View>
        </View>
     </RNModal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    top: 30,
    padding: 30,
    backgroundColor: '#e0e1dd',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: '#ccc',
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16
  },
  saveBtn: {
    backgroundColor: '#5465ff',
    borderRadius: 15,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    marginVertical: 10,
  },
  saveBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeBtn: {
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#ced4da"
  },
  closeModal: {
    color: '#333',

  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },

});

export default ModalContact;

