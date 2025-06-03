import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const countryCodes = [
  { code: '+1', name: 'USA' },
  { code: '+380', name: 'Ukraine' },
  { code: '+91', name: 'India' },
  // Добавьте другие коды стран по необходимости
];

const CountryCodeSelector = ({ route, navigation }) => {
  const { setCountryCode } = route.params;

  const handleSelectCode = (code) => {
    setCountryCode(code);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={countryCodes}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectCode(item.code)}>
            <Text style={{ padding: 20 }}>{`${item.name} (${item.code})`}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CountryCodeSelector;
