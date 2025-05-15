// import React, { useEffect, useState } from 'react';
// import {View, Text, FlatList, PermissionsAndroid, Platform, StyleSheet, Alert, Pressable} from 'react-native';
// import Contacts from 'react-native-contacts';
// import Clipboard from '@react-native-clipboard/clipboard';
//
// import CopyModal from "../Components/CopyModal";
//
// const ContactsPhone = () => {
//   const [contacts, setContacts] = useState([]);
//
//   const [errorVisible, setErrorVisible] = React.useState(false);
//   const [errorMessage, setErrorMessage] = React.useState("Copied");
//
//   const copyToClipboard = (number) => {
//     Clipboard.setString(number);
//     // Alert.alert('Скопировано', 'Номер скопирован в буфер обмена');
//
//     setErrorVisible(true);
//     setTimeout(() => {
//         setErrorVisible(false);
//     }, 3000);
//   };
//
//   const getRandomColor = () => {
//     const r = Math.floor((Math.random() * 127) + 128);
//     const g = Math.floor((Math.random() * 127) + 128);
//     const b = Math.floor((Math.random() * 127) + 128);
//     return `rgb(${r}, ${g}, ${b})`;
//   };
//
//   useEffect(() => {
//       ReadContacts();
//   }, []);
//
//   const ReadContacts = () => {
//      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
//         title: 'Contacts',
//         message: 'This app would like to view your contacts.',
//         buttonPositive: 'Please accept bare mortal',
//      })
//      .then(res => {
//         if(res === "granted") {
//            Contacts.getAll()
//               .then(contacts => {
//                  // work with contacts
//                  console.log(contacts);
//                  setContacts(contacts);
//               })
//               .catch(err => {
//                  console.log(err);
//               });
//         }
//      })
//      .catch(err => console.log(err));
//   };
//
//   const renderItem = ({ item }) => (
//      <View style={styles.container}>
//
//         <View style={[styles.iconContact, { backgroundColor: getRandomColor() }]}>
//            <Text style={styles.iconText}>{item.givenName.charAt(0)}</Text>
//         </View>
//         <Pressable
//            style={{ padding: 10 }}
//            onLongPress={() => copyToClipboard(item.phoneNumbers[0].number)}
//         >
//            <Text style={styles.nameContact}>{item.givenName} {item.familyName}</Text>
//            <Text>{item.phoneNumbers[0].number}</Text>
//         </Pressable>
//
//      </View>
//   );
//
//   return (
//      <View style={{ flex: 1, padding: 20 }}>
//
//         <CopyModal isVisible={errorVisible} message={errorMessage} />
//
//         <FlatList
//            data={contacts}
//            keyExtractor={item => item.recordID}
//            renderItem={renderItem}
//         />
//      </View>
//   );
// };


import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, PermissionsAndroid, StyleSheet, Pressable } from 'react-native';
import Contacts from 'react-native-contacts';
import Clipboard from '@react-native-clipboard/clipboard';

import CopyModal from "../Components/CopyModal";

const ContactsPhone = () => {
  const [contacts, setContacts] = useState([]);

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Copied");

  const copyToClipboard = (number) => {
    Clipboard.setString(number);
    setErrorVisible(true);
    setTimeout(() => {
      setErrorVisible(false);
    }, 3000);
  };

  const getRandomColor = () => {
    const r = Math.floor((Math.random() * 127) + 128);
    const g = Math.floor((Math.random() * 127) + 128);
    const b = Math.floor((Math.random() * 127) + 128);
    return `rgb(${r}, ${g}, ${b})`;
  };

  useEffect(() => {
    ReadContacts();
  }, []);

  const ReadContacts = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    })
      .then(res => {
        if (res === "granted") {
          Contacts.getAll()
            .then(contacts => {
              // Add a random color to each contact
              const contactsWithColor = contacts.map(contact => ({
                ...contact,
                color: getRandomColor(),
              }));
              setContacts(contactsWithColor);
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => console.log(err));
  };

  const renderItem = ({ item }) => (
    <View style={styles.contact}>
      <View style={[styles.iconContact, { backgroundColor: item.color }]}>
        <Text style={styles.iconText}>{item.givenName.charAt(0)}</Text>
      </View>
      <Pressable
        style={{ padding: 10 }}
        onLongPress={() => copyToClipboard(item.phoneNumbers[0].number)}
      >
        <Text style={styles.nameContact}>{item.givenName} {item.familyName}</Text>
        <Text>{item.phoneNumbers[0].number}</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <CopyModal isVisible={errorVisible} message={errorMessage} />
       {contacts.length === 0 ? (
        <View style={styles.noContactsContainer}>
          <Text style={styles.noContactsText}>No contacts on this phone</Text>
        </View>
      ) : (
      <FlatList
        data={contacts}
        keyExtractor={item => item.recordID}
        renderItem={renderItem}
      />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
       flex: 1,
       padding: 20,
       backgroundColor: '#e5e5e5'
    },
    contact: {
       flexDirection: 'row',
       alignItems: 'center',
       marginVertical: 10,
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
    iconContact: {
       width: 50,
       height: 50,
       borderRadius: 50,
       textAlign: "center",
       justifyContent: "center",
       alignItems: "center",
       marginLeft: 20,
       marginRight: 15,
    },
    iconText: {
       fontSize: 23,
    },
    nameContact: {
       fontSize: 18
    }
})

export default ContactsPhone;

