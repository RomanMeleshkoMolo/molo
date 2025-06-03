import React, { useState } from 'react';
import {View, TextInput, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Connect styles
import styles from "./styles/InputPhone.scss";

const InputPhone = ({ style }) => {
  const [countryCode, setCountryCode] = useState('+380');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const handleCountryCodePress = () => {
     navigation.navigate('CountryCodeSelector', {
        setCountryCode: (selectedCode) => setCountryCode(selectedCode),
     });
  };

  const handlePhoneNumberChange = (text) => {
     if (text.length > 20) {
      Alert.alert('Warning', 'Phone number cannot exceed 20 characters.');
    } else {
      setPhoneNumber(text);
    }
  };

  return (
     <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
        <TouchableOpacity onPress={handleCountryCodePress}>
           <TextInput
              style={[styles.input]}
              value={countryCode}
              editable={false}
           />
        </TouchableOpacity>
        <TextInput
           style={[styles.input]}
           placeholder="Phone Number"
           keyboardType="phone-pad"
           value={phoneNumber}
           onChangeText={handlePhoneNumberChange}
           autoFocus={true}
        />
     </View>
  );
};

export default InputPhone;
