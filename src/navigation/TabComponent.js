import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, Badge} from 'react-native-magnus';

import AppRoute from '../utils/approutes';
import {theme} from '../themes/theme';
import AppContext from '../context/AppContext';
import CartContext from '../context/CartContext';

//Screens
import {
  HomeScreen,
  CategoriesScreen,
  CartScreen,
  UserScreen,
  ProductSearch,
  UserLoginScreen,
} from '../screens';

const Tab = createBottomTabNavigator();
const TabComponent = () => {
  const {user} = useContext(AppContext);
  const {userCart} = useContext(CartContext);

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {height: 100, paddingTop: 10},
      }}>
      <Tab.Screen
        name={AppRoute.HOME}
        component={HomeScreen}
        options={{
          cardStyle: {backgroundColor: 'white'},
          tabBarLabel: () => null,
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              color={focused ? theme.colors.red : theme.colors.primary}
              fontSize="6xl"
              fontFamily="AntDesign"
            />
          ),
        }}
      />
      <Tab.Screen
        name={AppRoute.CATEGORIES}
        component={CategoriesScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({focused}) => (
            <Icon
              name="bars"
              color={focused ? theme.colors.red : theme.colors.primary}
              fontSize="6xl"
              fontFamily="AntDesign"
            />
          ),
        }}
      />
      <Tab.Screen
        name={AppRoute.SEARCH}
        component={ProductSearch}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({focused}) => (
            <Icon
              name="search1"
              color={focused ? theme.colors.red : theme.colors.primary}
              fontSize="6xl"
              fontFamily="AntDesign"
            />
          ),
        }}
      />
      <Tab.Screen
        name={AppRoute.CART}
        component={CartScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({focused}) => (
            <>
              <Badge
                fontSize={8}
                p={4}
                bg={userCart?.length ? 'red' : 'transparent'}
                zIndex={999}>
                <Icon
                  name="shoppingcart"
                  color={focused ? theme.colors.red : theme.colors.primary}
                  fontSize="6xl"
                  fontFamily="AntDesign"
                />
              </Badge>
            </>
          ),
        }}
      />
      <Tab.Screen
        name={AppRoute.PROFILE}
        component={user ? UserScreen : UserLoginScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({focused}) => (
            <Icon
              name="user"
              color={focused ? theme.colors.red : theme.colors.primary}
              fontSize="6xl"
              fontFamily="AntDesign"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabComponent;
