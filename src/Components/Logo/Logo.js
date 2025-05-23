import {StyleSheet, View, Image,} from 'react-native';

const Logo = ({  logoName, navigation }) => {

    const getImageSource = ( logo ) => {
        return logo ? require('../../../assets/icon.png') :
                      require('../../../assets/icon_no_load.png')
    };

    return (

       <View style={styles.headerLogo}>
          <Image
             source={getImageSource(logoName)}
             style={styles.logo}
             resizeMode="contain"
          />
       </View>

    )

};

const styles = StyleSheet.create({

 // Logo
  logo: {
      width: 170,
      height: 170,
      marginBottom: 40,
      borderRadius: 20
  },
  headerLogo: {
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
  },

})

export default Logo;
