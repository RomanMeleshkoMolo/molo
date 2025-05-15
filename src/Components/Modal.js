import React from 'react';
import { View, Text, Button, Modal as RNModal, StyleSheet, TouchableOpacity } from 'react-native';

// Connect AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Connect Navigator
import { useNavigation } from '@react-navigation/native';


const Modal = ({ modalVisible, setModalVisible, userData }) => {
  const navigation = useNavigation();

  const clearDataAndRedirect = async () => {
       try {
         await AsyncStorage.clear();
         userData.login = '';
         userData.password = '';
         userData.authDomain = '';
         userData.displayName = '';

         setModalVisible(false);
         navigation.navigate('Login');
       } catch (e) {
         alert("Failed to clear data");
       }
     };

  return (
     <RNModal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
     >

     <View style={styles.modalView}>
        <Text style={styles.header}>Account</Text>

        <View style={styles.infoAccount}>

            <View>
                <Text style={styles.name}>Логин:</Text>
                <Text style={styles.name}>Пароль:</Text>
                <Text style={styles.name}>Домен:</Text>
                <Text style={styles.name}>Имя:</Text>
            </View>
            <View>
                <Text style={styles.nameValue}>{userData.login}</Text>
                <Text style={styles.nameValue}>{userData.password}</Text>
                <Text style={styles.nameValue}>{userData.authDomain}</Text>
                 <Text style={styles.nameValue}>{userData.displayName}</Text>
            </View>

        </View>

        <View style={styles.buttonRow}>
           <TouchableOpacity style={styles.removeBtn} onPress={clearDataAndRedirect}>
             <Text style={styles.removeBtnAccount}>REMOVE ACCOUNT</Text>
           </TouchableOpacity>

           <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
             <Text>CLOSE</Text>
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  infoAccount: {
     flexDirection: 'row',
     alignItems: 'center',
     marginVertical: 10,
     borderRadius: 10,
     padding: 20,
     justifyContent: "space-between",
  },

  name: {
    color: "#333",
    position: "relative",
    paddingVertical: 6,
    paddingHorizontal: 20,
    fontWeight: "bold",
    fontSize: 17
  },
  nameValue: {
    color: "#333",
    fontWeight: "normal",
    paddingHorizontal: 20,
    fontSize: 17,
    paddingVertical: 6
  },

  removeBtn: {
    padding: 11,
    borderRadius: 15,
    backgroundColor: "#e3757e"
  },
  closeBtn: {
    padding: 11,
    borderRadius: 15,
    paddingHorizontal: 20,
    backgroundColor: "#ced4da"
  },
  removeBtnAccount: {
    color: "#fff",

  }
});

export default Modal;
