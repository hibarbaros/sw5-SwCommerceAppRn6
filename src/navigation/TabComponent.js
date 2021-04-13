import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppRoute from '../utils/approutes';
import {colors} from '../themes/variables';
import AppContext from '../context/AppContext';
import CartContext from '../context/CartContext';

import {Styled} from './styles';

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
            <Styled.StyledIcon
              fill={focused ? colors.blue : colors.themeColor}
              name="home-outline"
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
            <Styled.StyledIcon
              fill={focused ? colors.blue : colors.themeColor}
              name="book-open-outline"
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
            <Styled.StyledIcon
              fill={focused ? colors.blue : colors.themeColor}
              name="search-outline"
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
              <Styled.StyledIcon
                fill={focused ? colors.blue : colors.themeColor}
                name="shopping-cart-outline"
              />
              {userCart.length > 0 && (
                <Styled.CartIcon>
                  <Styled.CartIconText>{userCart?.length}</Styled.CartIconText>
                </Styled.CartIcon>
              )}
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
            <Styled.StyledIcon
              fill={focused ? colors.blue : colors.themeColor}
              name="person-outline"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabComponent;
