import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerComponent from './DrawerComponent';
import SerciveHelpStacks from './SerciveHelpStacks';
import { HeaderLeft, HeaderRight } from 'components/Header';
import AppRoutes from 'utils/approutes';

//Screens
import {
  HomeScreen,
  UserEditScreen,
  SettingScreen,
  ProductDetailScreen,
  CartScreen,
  UserLoginScreen,
  UserRegisterScreen,
  UserScreen,
  UserAddressAddScreen,
  UserOrdersScreen,
  OrderDetail,
  UserAddresses,
  CategoriesProducts,
  ProductSearch,
  Whislist,
  CheckoutWizard,
  CheckoutOrder,
  LocalNotification,
  UserPasswordEdit,
  AboutShop,
  AddressList
} from 'screens';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      headerMode="float"
      screenOptions={() => ({
        headerRight: () => <HeaderRight />,
        headerLeft: () => <HeaderLeft />,
        headerStyle: {
          shadowOpacity: 0,
          elevation: 0
        },
        animationEnabled: true
      })}
    >
      <Stack.Screen component={DrawerComponent} name="Lemken Shop" useRoute="mainscreen" />

      <Stack.Screen component={HomeScreen} name={AppRoutes.HOME} />
      <Stack.Screen component={ProductDetailScreen} name={AppRoutes.PRODUCT_DETAIL} />
      <Stack.Screen component={CartScreen} name={AppRoutes.CART} />
      <Stack.Screen component={SettingScreen} name={AppRoutes.SETTINGS} />
      <Stack.Screen component={SerciveHelpStacks} name={AppRoutes.SERVICE_HELP} />
      <Stack.Screen component={UserScreen} name={AppRoutes.PROFILE} />
      <Stack.Screen component={UserLoginScreen} name={AppRoutes.LOGIN} />
      <Stack.Screen component={UserRegisterScreen} name={AppRoutes.REGISTER} />
      <Stack.Screen component={UserEditScreen} name={AppRoutes.PROFILE_EDIT} />
      <Stack.Screen component={UserAddressAddScreen} name={AppRoutes.ADDRESS_ADD} />
      <Stack.Screen component={UserOrdersScreen} name={AppRoutes.ORDERS} />
      <Stack.Screen component={OrderDetail} name={AppRoutes.ORDER_DETAIL} />
      <Stack.Screen component={UserAddresses} name={AppRoutes.USER_ADDRESSES} />
      <Stack.Screen component={ProductSearch} name={AppRoutes.SEARCH} />
      <Stack.Screen component={CategoriesProducts} name={AppRoutes.CATEGORIES_PRODUCTS} />
      <Stack.Screen component={Whislist} name={AppRoutes.WHISLIT} />
      <Stack.Screen component={CheckoutWizard} name={AppRoutes.CHECKOUT_WIZARD} />
      <Stack.Screen component={UserPasswordEdit} name={AppRoutes.PASSWORD_EDIT} />
      <Stack.Screen component={AboutShop} name={AppRoutes.ABOUT_SHOP} />
      <Stack.Screen component={AddressList} name={AppRoutes.ADDRESSES} />
      <Stack.Screen
        component={CheckoutOrder}
        name={AppRoutes.CHECKOUT_ORDER}
        options={() => ({
          headerRight: () => <HeaderRight />,
          headerLeft: () => null
        })}
      />
      <Stack.Screen component={LocalNotification} name={AppRoutes.LOCAL_NOTIFICATION} />
    </Stack.Navigator>
  );
}
