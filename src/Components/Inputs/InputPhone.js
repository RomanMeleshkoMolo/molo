import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Connect Components
import ModalError from "../Modals/ModalError";

// Connect styles
import styles from "./styles/InputPhone.scss";

const InputPhone = ({ style, onPhoneNumber, onChangeText }) => {
  const [countryCode, setCountryCode] = useState('+380');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showError, setShowError] = useState(false);
  const navigation = useNavigation();

  const handleCountryCodePress = () => {
     navigation.navigate('CountryCodeSelector', {
        setCountryCode: (selectedCode) => setCountryCode(selectedCode),
     });
  };

  const handlePhoneNumberChange = (input) => {
     if (input.length > 20) {
       setShowError(true);
       return;
     }

     setShowError(false);
     setPhoneNumber(input);

     const fullNumber = `${countryCode}${input}`;

     if (onPhoneNumber) {
       onPhoneNumber(fullNumber.length > 7);
     }

     if (onChangeText) {
       onChangeText(fullNumber);
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

