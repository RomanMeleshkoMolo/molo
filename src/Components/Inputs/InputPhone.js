import React, { useState } from 'react';
import {View, TextInput, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Connect Components
import ModalError from "../Modals/ModalError";
import ModalSuccess from "../Modals/ModalSuccess";
import ModalWarning from "../Modals/ModalWarning";

// Connect styles
import styles from "./styles/InputPhone.scss";

const InputPhone = ({ style, onPhoneNumber }) => {
  const [countryCode, setCountryCode] = useState('+380');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showError, setShowError] = useState(false);
  const navigation = useNavigation();

  const handleCountryCodePress = () => {
     navigation.navigate('CountryCodeSelector', {
        setCountryCode: (selectedCode) => setCountryCode(selectedCode),
     });
  };

  const handlePhoneNumberChange = (text) => {
     if (text.length > 20) {
       setShowError(true);
       return;
     }

     setShowError(false);
     setPhoneNumber(text);
     if (onPhoneNumber) {
       onPhoneNumber(text.length > 7);
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
        {showError && (
         <ModalError
            message="Номер не должен превышать 20 символов"
            onHide={() => setShowError(false)}
         />
      )}
     </View>
  );
};

export default InputPhone;
