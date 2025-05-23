import { StyleSheet } from 'react-native';

const variables = {
  primaryColor: '#f0f0f0',
  textColor: '#000',
  iconColor: "#000",
  padding: 20,
  backgroundColor: "#d9dcd6"
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
    color: variables.iconColor,
  },
  globalBtnText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: variables.textColor,
  },
  globalBackground: {
    backgroundColor: variables.backgroundColor
  }

});

export { globalStyles, variables };
