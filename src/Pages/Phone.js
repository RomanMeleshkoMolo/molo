import React, {useEffect, useState, useRef} from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Animated,
    Dimensions,
    Button,
    NativeModules,
    NativeEventEmitter
} from 'react-native';

// Connect AsyncStore
import AsyncStorage from '@react-native-async-storage/async-storage';

// Connect sound
import Sound from 'react-native-sound';
Sound.setCategory('Playback');

// Connect Icons
import Icon from 'react-native-vector-icons/Ionicons';

// const { PjsipModule } = NativeModules;
// const pjsipEventEmitter = new NativeEventEmitter(PjsipModule);

// Components
import Modal from "../Components/Modal";
import ModalContact from "../Components/ModalContact";
// import SipComponent from "../Componets/SipComponent";
// import SipConnect from "../Componets/SipConnect";

import Menu from "../Components/Menu";

const Phone = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sound, setSound] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContactVisible, setModalContactVisible] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState('Not Registered');
  const [userData, setUserData] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Added for animate menu
  const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').width)).current;
  const toggleMenu = () => {
     const newMenuState = slideAnim._value === 0 ? -Dimensions.get('window').width : 0;
     setIsMenuOpen(newMenuState === 0);
     Animated.timing(slideAnim, {
        toValue: newMenuState,
        duration: 300,
        useNativeDriver: true,
     }).start();
  };

  useEffect(() => {
     const getData = async () => {
        try {
           const login = await AsyncStorage.getItem('@login');
           const password = await AsyncStorage.getItem('@password');
           const authDomain = await AsyncStorage.getItem('@authDomain');
           const displayName = await AsyncStorage.getItem('@displayName');
           setUserData({ login, password, authDomain, displayName });
        } catch (e) {
           alert("Failed to fetch data");
        }
     };
     getData();
  }, []);

  const playSound = () => {
     const sound = new Sound('dtmf.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        sound.play(() => {
          sound.release();
        });
     });
  };

  useEffect(() => {
     return sound
        ? () => {
          sound.release();
        }
      : undefined;
  }, [sound]);

  const renderButton = (label) => (
     <TouchableOpacity
        style={styles.button}
           onPress={() => {
             if (phoneNumber.length <= 12) {
             setPhoneNumber(phoneNumber + label);
             playSound();
           }
        }}
     >
       <Text style={styles.buttonText}>{label}</Text>
     </TouchableOpacity>
  );

  const deleteNumber = () => {
     setPhoneNumber(phoneNumber.slice(0, -1));
  };

  return (
     <View style={styles.container}>

        {isMenuOpen && (
          <TouchableOpacity style={styles.overlay} onPress={toggleMenu} />
        )}

        <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
           <Menu
             userData={userData}
           />
        </Animated.View>

        <View style={styles.statusBar}>
          <Text style={styles.statusText}>Registration Status: {registrationStatus}</Text>
        </View>

        <View style={styles.icon_container}>
           <TouchableOpacity onPress={toggleMenu}>
             <Icon name="menu-outline" size={30} style={styles.iconMenu} />
           </TouchableOpacity>

           <View style={styles.iconGroup}>
              <Icon
                 name="person-circle-outline"
                 size={34}
                 onPress={() => setModalContactVisible(true)}
                 style={styles.icon_setting}
              />
              <Icon
                 name="settings-outline"
                 size={30}
                 onPress={() => setModalVisible(true)}
                 style={styles.icon_setting}
              />
           </View>
        </View>

        <Modal
           modalVisible={modalVisible}
           setModalVisible={setModalVisible}
           userData={userData}
        />
        <ModalContact
           modalContactVisible={modalContactVisible}
           setModalContactVisible={setModalContactVisible}
        />

        <TextInput
           style={styles.input}
           value={phoneNumber}
           onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
           placeholder=""
           keyboardType="numeric"
        />

        <View style={styles.dialPad}>
           <View style={styles.row}>
              {renderButton('1')}
              {renderButton('2')}
              {renderButton('3')}
           </View>
           <View style={styles.row}>
              {renderButton('4')}
              {renderButton('5')}
              {renderButton('6')}
           </View>
           <View style={styles.row}>
              {renderButton('7')}
              {renderButton('8')}
              {renderButton('9')}
           </View>
           <View style={styles.row}>
              {renderButton('+')}
              {renderButton('0')}
              {renderButton('#')}
           </View>
        </View>

        <View style={styles.actionButtons}>
           <TouchableOpacity style={styles.videoButton}>
              <Text style={styles.videoButtonText}>
                 <Icon name="videocam" size={30} style={styles.icon_setting} />
              </Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.callButton}>
              <Text style={styles.callButtonText}>
                 <Icon name="call" size={30} style={styles.icon_setting} />
              </Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.deleteButton} onPress={deleteNumber}>
              <Text style={styles.buttonDelete}>
                 <Icon name="arrow-back" size={30} style={styles.icon_setting} />
              </Text>
           </TouchableOpacity>
        </View>
     </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 20,
  },
  statusBar: {
    backgroundColor: '#ffffff',
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  icon_container: {
    top: -20,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconGroup: {
    flexDirection: 'row',
  },
  icon_setting: {
    textAlign: "right",
    paddingHorizontal: 20
  },
  input: {
    fontSize: 35,
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "#bbbdbd",
    textAlign: "center",
  },
  statusText: {
    color: '#000',
  },
  dialPad: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 40,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 24,
    color: '#000',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // width: '50%',
    marginVertical: 30,
    bottom: 50
  },
  callButton: {
    backgroundColor: '#4caf50',
    borderRadius: 40,
    width: 70,
    height: 70,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  videoButton: {
    backgroundColor: '#2196f3',
    borderRadius: 40,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#e3757e',
    borderRadius: 40,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDelete: {
    color: "#333",
    fontSize: 30
  },
  videoButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  navItem: {
    fontSize: 16,
    color: '#000',
  },

  // Styles for left Menu
  menu: {
    position: 'absolute',
    // width: Dimensions.get('window').width,
    width: '70%',
    left: 0,
    backgroundColor: "#e7ecef",
    elevation: 5,
    zIndex: 9,
    height: "100%"
  },
  iconMenu: {
    paddingLeft: 20
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
});

export default Phone;
