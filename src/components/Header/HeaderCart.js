import React, {useContext} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppContext from '../../context/AppContext';
// import {Badge} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import routes from '../../utils/routes';

const {cartScreen} = routes;

export default function HeaderRight() {
  const navigation = useNavigation();
  const {cartCount} = useContext(AppContext);

  return (
    <View>
      <Icon
        name="shopping-cart"
        size={30}
        onPress={() => navigation.navigate(cartScreen)}
      />
      {/* <Badge value={cartCount} status="success" /> */}
    </View>
  );
}
