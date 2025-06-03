import { View, Image } from 'react-native';

// Connect styles
import styles from "./styles/Logo.scss";

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

export default Logo;
