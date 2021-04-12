import React from 'react';
import {Button} from 'react-native-magnus';
import {useNavigation} from '@react-navigation/native';

import AppRoute from '../../../utils/approutes';

export default function RegisterButton() {
  const navigation = useNavigation();
  return (
    <Button onPress={() => navigation.navigate(AppRoute.REGISTER)}>
      Register
    </Button>
  );
}
