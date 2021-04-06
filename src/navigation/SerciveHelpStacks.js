import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AppRoutes from '../utils/approutes';
import {ServiceHelp} from '../screens';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name={AppRoutes.SERVICE_HELP} component={ServiceHelp} />
  </Stack.Navigator>
);
