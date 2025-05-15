






// import React, { useEffect, useState, useCallback } from 'react';
// import {View, Text, FlatList, StyleSheet, TouchableOpacity, Alert} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useFocusEffect } from '@react-navigation/native';
//
// const Contacts = () => {
//   const [contacts, setContacts] = useState([]);
//
//   useFocusEffect(
//     useCallback(() => {
//       const loadContacts = async () => {
//         try {
//           const storedContacts = await AsyncStorage.getItem('contacts');
//           if (storedContacts) {
//             setContacts(JSON.parse(storedContacts));
//           }else {
//               Alert.alert("no cont");
//           }
//         } catch (error) {
//           console.error("Error loading contacts:", error);
//         }
//       };
//
//       loadContacts();
//     }, [])
//   );
//
//   const deleteContact = async (index) => {
//     try {
//       const updatedContacts = contacts.filter((_, i) => i !== index);
//       setContacts(updatedContacts);
//       await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
//     } catch (error) {
//       console.error("Error deleting contact:", error);
//     }
//   };
//
//   return (
//      <View style={styles.container}>
//
//         <FlatList
//            data={contacts}
//            keyExtractor={(item, index) => index.toString()}
//            renderItem={({ item, index }) => (
//               <View style={styles.contactItem}>
//                  <View>
//                     <Text style={styles.name}>{item.name}</Text>
//                     <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
//                  </View>
//                  <View style={styles.deleteContainer}>
//                     <TouchableOpacity onPress={() => deleteContact(index)} style={styles.deleteButton}>
//                        <Icon name="delete"
//                              size={25} color="#000"
//                        />
//                     </TouchableOpacity>
//                  </View>
//               </View>
//            )}
//         />
//
//          <View>
//              <Text>No contacts</Text>
//          </View>
//      </View>
//   );
// };




import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadContacts = async () => {
        try {
          const storedContacts = await AsyncStorage.getItem('contacts');
          if (storedContacts) {
            setContacts(JSON.parse(storedContacts));
          } else {
            setContacts([]); // Ensure contacts is an empty array if none are stored
          }
        } catch (error) {
          console.error("Error loading contacts:", error);
        }
      };

      loadContacts();
    }, [])
  );

  const deleteContact = async (index) => {
    try {
      const updatedContacts = contacts.filter((_, i) => i !== index);
      setContacts(updatedContacts);
      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <View style={styles.container}>
      {contacts.length === 0 ? (
        <View style={styles.noContactsContainer}>
          <Text style={styles.noContactsText}>No contacts</Text>
        </View>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.contactItem}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
              </View>
              <View style={styles.deleteContainer}>
                <TouchableOpacity onPress={() => deleteContact(index)} style={styles.deleteButton}>
                  <Icon name="delete" size={25} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e5e5e5"
  },

  noContactsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContactsText: {
    fontSize: 18,
    color: '#888',
  },

  name: {
    fontSize: 18,
    paddingVertical: 5,
    fontWeight: "300"
  },
  phoneNumber: {
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
    backgroundColor: "#fff"
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#dee2e6",
  },
  deleteContainer: {

  },
  deleteButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#ff5e5b',
    marginVertical: "auto",
    borderRadius: "50%",
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Contacts;
