import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';

import { Button } from 'themes/components';
import TabComponent from './TabComponent';

import { useAppContext } from 'context/AppContext';
import { useLocalizationContext } from 'context/Translations';

import AppRoutes from 'utils/approutes';
import { useCustomerLogout } from 'utils/hooks/useCustomer';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { user } = useAppContext();
  const { translations } = useLocalizationContext();

  const { mutate: logoutMutate } = useCustomerLogout();

  function handleMenuItem(route) {
    props.navigation.navigate(route);
    props.navigation.dispatch(DrawerActions.closeDrawer());
  }

  const topMenu = [
    {
      title: translations.whislist,
      icon: 'star',
      route: AppRoutes.WHISLIT
    },
    {
      title: translations.settings,
      icon: 'settings',
      route: AppRoutes.SETTINGS
    },
    {
      title: translations.serviceHelp,
      icon: 'help-circle',
      route: AppRoutes.SERVICE_HELP
    },
    {
      title: translations.aboutShop,
      icon: 'info',
      route: AppRoutes.ABOUT_SHOP
    }
  ];
  const topUserMenu = [
    {
      title: translations.myAdresses,
      icon: 'home',
      route: AppRoutes.USER_ADDRESSES
    },
    {
      title: translations.myOrders,
      icon: 'credit-card',
      route: AppRoutes.ORDERS
    }
  ];
  const nonUserMenu = [
    {
      title: translations.login,
      icon: 'home',
      route: AppRoutes.LOGIN
    },
    {
      title: translations.register,
      icon: 'credit-card',
      route: AppRoutes.REGISTER
    }
  ];

  return (
    <DrawerContentScrollView>
      {user &&
        topUserMenu.map((item, index) => (
          <Button
            key={index}
            block
            variant="drawer"
            suffix={item.icon}
            iconColor="grey"
            text={item.title}
            onPress={() => handleMenuItem(item.route)}
          />
        ))}
      {!user &&
        nonUserMenu.map((item, index) => (
          <Button
            key={index}
            block
            variant="drawer"
            suffix={item.icon}
            iconColor="grey"
            text={item.title}
            onPress={() => handleMenuItem(item.route)}
          />
        ))}

      {topMenu.map((item, index) => (
        <Button
          key={index}
          block
          variant="drawer"
          suffix={item.icon}
          iconColor="grey"
          text={item.title}
          onPress={() => handleMenuItem(item.route)}
        />
      ))}
      {user && (
        <Button
          block
          variant="drawer"
          iconColor="grey"
          text={translations.logout}
          onPress={() => {
            logoutMutate();
          }}
        />
      )}
    </DrawerContentScrollView>
  );
}

const DrawerComponent = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen component={TabComponent} name={'TabComponent'} />
    </Drawer.Navigator>
  );
};

export default DrawerComponent;
