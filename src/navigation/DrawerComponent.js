import React, {useContext} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import {MenuItem, Divider, ListItem} from '@ui-kitten/components';

import AppContext from '../context/AppContext';
import {
  ForwardIcon,
  RegisterIcon,
  LoginIcon,
  SettingsIcon,
  LogoutIcon,
  CreditCardIcon,
  StarIcon,
} from '../themes/components/IconSet';
import TabComponent from './TabComponent';
import AppRoutes from '../utils/approutes';
import {useCustomerLogout} from '../utils/hooks/useCustomer';
import {LocalizationContext} from '../context/Translations';
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const {user} = useContext(AppContext);
  const {translations} = useContext(LocalizationContext);

  const {mutate: logoutMutate} = useCustomerLogout();

  return (
    <DrawerContentScrollView {...props}>
      {user && (
        <>
          <MenuItem
            title={translations.myAdresses}
            accessoryLeft={LoginIcon}
            accessoryRight={ForwardIcon}
            onPress={() => {
              props.navigation.navigate(AppRoutes.USER_ADDRESSES);
              props.navigation.dispatch(DrawerActions.closeDrawer());
            }}
          />
          <MenuItem
            title={translations.myOrders}
            accessoryLeft={CreditCardIcon}
            accessoryRight={ForwardIcon}
            onPress={() => {
              props.navigation.navigate(AppRoutes.ORDERS);
              props.navigation.dispatch(DrawerActions.closeDrawer());
            }}
          />
        </>
      )}
      {!user && (
        <>
          <MenuItem
            title={translations.login}
            accessoryLeft={LoginIcon}
            accessoryRight={ForwardIcon}
            onPress={() => {
              props.navigation.navigate(AppRoutes.LOGIN);
              props.navigation.dispatch(DrawerActions.closeDrawer());
            }}
          />
          <MenuItem
            title={translations.register}
            accessoryLeft={RegisterIcon}
            accessoryRight={ForwardIcon}
            onPress={() => {
              props.navigation.navigate(AppRoutes.REGISTER);
              props.navigation.dispatch(DrawerActions.closeDrawer());
            }}
          />
        </>
      )}
      <MenuItem
        title={translations.settings}
        accessoryLeft={SettingsIcon}
        accessoryRight={ForwardIcon}
        onPress={() => {
          props.navigation.navigate(AppRoutes.SETTINGS);
          props.navigation.dispatch(DrawerActions.closeDrawer());
        }}
      />
      <MenuItem
        title={translations.whislist}
        accessoryLeft={StarIcon}
        accessoryRight={ForwardIcon}
        onPress={() => {
          props.navigation.navigate(AppRoutes.WHISLIT);
          props.navigation.dispatch(DrawerActions.closeDrawer());
        }}
      />
      {user && (
        <>
          <MenuItem
            title={translations.logout}
            accessoryLeft={LogoutIcon}
            onPress={() => {
              logoutMutate();
              // logoutUserContext();
              props.navigation.dispatch(DrawerActions.closeDrawer());
            }}
          />
        </>
      )}
      <Divider />
      <ListItem
        onPress={() => {
          props.navigation.navigate(AppRoutes.SERVICE_HELP);
          props.navigation.dispatch(DrawerActions.closeDrawer());
        }}
        title={translations.serviceHelp}
      />
      <ListItem
        onPress={() => {
          props.navigation.navigate(AppRoutes.ABOUT_SHOP);
          props.navigation.dispatch(DrawerActions.closeDrawer());
        }}
        title={translations.aboutShop}
      />
    </DrawerContentScrollView>
  );
}

const DrawerComponent = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen component={TabComponent} name={'TabComponent'} />
    </Drawer.Navigator>
  );
};

export default DrawerComponent;
