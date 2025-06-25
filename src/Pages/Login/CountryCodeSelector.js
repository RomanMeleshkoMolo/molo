import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

// Connect components
import GoBackButton from "Components/Buttons/GoBackButton";

// Connect styles
import styles from "./styles/CountryCodeSelector.scss";

const countryCodes = [
  { code: '+1', name: 'USA', flag: '🇺🇸' },
  { code: '+380', name: 'Ukraine', flag: '🇺🇦' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: '+82', name: 'South Korea', flag: '🇰🇷' },
  { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+46', name: 'Sweden', flag: '🇸🇪' },
  { code: '+31', name: 'Netherlands', flag: '🇳🇱' },
  { code: '+41', name: 'Switzerland', flag: '🇨🇭' },
  { code: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: '+52', name: 'Mexico', flag: '🇲🇽' },
  { code: '+90', name: 'Turkey', flag: '🇹🇷' },
  { code: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: '+48', name: 'Poland', flag: '🇵🇱' },
  { code: '+32', name: 'Belgium', flag: '🇧🇪' },
  { code: '+47', name: 'Norway', flag: '🇳🇴' },
  { code: '+45', name: 'Denmark', flag: '🇩🇰' },
  { code: '+420', name: 'Czech Republic', flag: '🇨🇿' },
  { code: '+30', name: 'Greece', flag: '🇬🇷' },
  { code: '+358', name: 'Finland', flag: '🇫🇮' },
  { code: '+64', name: 'New Zealand', flag: '🇳🇿' },
  { code: '+63', name: 'Philippines', flag: '🇵🇭' },
  { code: '+60', name: 'Malaysia', flag: '🇲🇾' },
  { code: '+66', name: 'Thailand', flag: '🇹🇭' },
  { code: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: '+56', name: 'Chile', flag: '🇨🇱' },
  { code: '+51', name: 'Peru', flag: '🇵🇪' },
  { code: '+57', name: 'Colombia', flag: '🇨🇴' },
  { code: '+58', name: 'Venezuela', flag: '🇻🇪' },
  { code: '+972', name: 'Israel', flag: '🇮🇱' },
  { code: '+20', name: 'Egypt', flag: '🇪🇬' },
  { code: '+234', name: 'Nigeria', flag: '🇳🇬' },
  { code: '+212', name: 'Morocco', flag: '🇲🇦' },
  { code: '+216', name: 'Tunisia', flag: '🇹🇳' },
  { code: '+250', name: 'Rwanda', flag: '🇷🇼' }
];

const CountryCodeSelector = ({ route, navigation }) => {
  const { setCountryCode } = route.params;

  const handleSelectCode = (code) => {
    setCountryCode(code);
    navigation.goBack();
  };

  return (
     <View style={[styles.container]}>

        <View style={[styles.backButton]}>
           <GoBackButton
             navigation={navigation}
           />
          <Text style={[styles.headerText]}>Страна/Регион</Text>
        </View>


        <FlatList
           data={countryCodes}
           keyExtractor={(item) => item.code}
           renderItem={({ item }) => (
              <TouchableOpacity style={[styles.item]} onPress={() => handleSelectCode(item.code)}>
                 <Text style={[styles.flag]}>{item.flag}</Text>
                 <Text style={[styles.text]}>{`${item.name} (${item.code})`}</Text>
              </TouchableOpacity>
           )}
        />
     </View>
  );
};

export default CountryCodeSelector;
