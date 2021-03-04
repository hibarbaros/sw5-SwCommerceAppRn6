import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AppRoutes from '../utils/approutes';
//Screens
import {
  UserEditScreen,
  UserLoginScreen,
  UserScreen,
  UserRegister,
  UserRegisterScreen,
} from '../screens';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen component={UserScreen} name={AppRoutes.PROFILE} />
    <Stack.Screen component={UserEditScreen} name={AppRoutes.PROFILE_EDIT} />
    <Stack.Screen component={UserRegisterScreen} name={AppRoutes.REGISTER} />
    <Stack.Screen component={UserLoginScreen} name={AppRoutes.LOGIN} />
    <Stack.Screen component={UserRegister} name={AppRoutes.REGISTER} />
  </Stack.Navigator>
);
