import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Button } from 'themes/components';

import AppRoute from 'utils/approutes';

export default function RegisterButton() {
  const navigation = useNavigation();
  return <Button text="Register" block onPress={() => navigation.navigate(AppRoute.REGISTER)} />;
}
