import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import routes from 'utils/routes';

const {cartScreen} = routes;

export default function HeaderRight() {
  const navigation = useNavigation();

  return (
    <View>
      <Icon
        name="shopping-cart"
        size={30}
        onPress={() => navigation.navigate(cartScreen)}
      />
    </View>
  );
}
