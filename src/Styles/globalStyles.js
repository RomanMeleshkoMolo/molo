import { StyleSheet } from 'react-native';

const variables = {
  primaryColor: '#f0f0f0',
  textColor: '#000',
  iconColor: "#000",
  padding: 20
};

const globalStyles = StyleSheet.create({
  globalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: variables.padding,
    backgroundColor: variables.primaryColor,
    borderRadius: 50,
    justifyContent: 'center',
    marginVertical: 10,
  },
  globalIcon: {
    marginRight: 10,
    color: variables.iconColor, // Цвет иконки
  },
  globalBtnText: {
    fontSize: 16,
    fontFamily: 'honk-regular',

    color: variables.textColor, // Цвет текста
  },
});

export { globalStyles, variables };
