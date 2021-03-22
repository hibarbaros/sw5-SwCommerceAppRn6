import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useQuery} from 'react-query';
import _ from 'lodash';
import {v4 as uuidv4} from 'uuid';

import DrawerComponent from './DrawerComponent';
import SerciveHelpStacks from './SerciveHelpStacks';
import {HeaderLeft, HeaderRight} from '../components/Header';
import AppRoutes from '../utils/approutes';
import {customerData} from '../utils/actions/useractions';
import {getCartBySessionId} from '../utils/actions/cartactions';
import {shopData, paymentsData} from '../utils/actions/appactions';
import AppContext from '../context/AppContext';

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
} from '../screens';

const Stack = createStackNavigator();

export default function MainNavigator() {
  const {
    user,
    setUserContext,
    setCurrency,
    setPaymentMethods,
    setCartCount,
    sessionId,
    setSessionId,
  } = useContext(AppContext);

  useQuery('customerDataContext', () => customerData(user), {
    enabled: !!user,
    onSuccess: (res) => {
      if (res) {
        setUserContext(res.id, res.sessionId);
      }
    },
  });

  useQuery('userCartCount', () => getCartBySessionId(sessionId), {
    enabled: !!sessionId,
    onSuccess: (res) => {
      const totalPrice = _.sumBy(res, 'quantity');
      setCartCount(totalPrice);
    },
  });

  useQuery('shopContext', () => shopData(), {
    onSuccess: (data) => setCurrency(data.currencies[0]),
  });

  useQuery('paymentContext', () => paymentsData(), {
    onSuccess: (data) => setPaymentMethods(data),
  });

  React.useEffect(() => {
    if (!sessionId) {
      setSessionId(uuidv4());
      console.log(`sayi1`, uuidv4());
    }
  }, [sessionId]);

  return (
    <Stack.Navigator
      headerMode="float"
      screenOptions={() => ({
        headerRight: () => <HeaderRight />,
        headerLeft: () => <HeaderLeft />,
        headerStyle: {
          shadowOpacity: 0,
          elevation: 0,
        },
        animationEnabled: true,
      })}>
      <Stack.Screen
        component={DrawerComponent}
        name="Lemken Shop"
        useRoute="mainscreen"
      />

      <Stack.Screen component={HomeScreen} name={AppRoutes.HOME} />
      <Stack.Screen
        component={ProductDetailScreen}
        name={AppRoutes.PRODUCT_DETAIL}
      />
      <Stack.Screen component={CartScreen} name={AppRoutes.CART} />
      <Stack.Screen component={SettingScreen} name={AppRoutes.SETTINGS} />
      <Stack.Screen
        component={SerciveHelpStacks}
        name={AppRoutes.SERVICE_HELP}
      />
      <Stack.Screen component={UserScreen} name={AppRoutes.PROFILE} />
      <Stack.Screen component={UserLoginScreen} name={AppRoutes.LOGIN} />
      <Stack.Screen component={UserRegisterScreen} name={AppRoutes.REGISTER} />
      <Stack.Screen component={UserEditScreen} name={AppRoutes.PROFILE_EDIT} />
      <Stack.Screen
        component={UserAddressAddScreen}
        name={AppRoutes.ADDRESS_ADD}
      />
      <Stack.Screen component={UserOrdersScreen} name={AppRoutes.ORDERS} />
      <Stack.Screen component={OrderDetail} name={AppRoutes.ORDER_DETAIL} />
      <Stack.Screen component={UserAddresses} name={AppRoutes.USER_ADDRESSES} />
      <Stack.Screen component={ProductSearch} name={AppRoutes.SEARCH} />
      <Stack.Screen
        component={CategoriesProducts}
        name={AppRoutes.CATEGORIES_PRODUCTS}
      />
      <Stack.Screen component={Whislist} name={AppRoutes.WHISLIT} />
      <Stack.Screen
        component={CheckoutWizard}
        name={AppRoutes.CHECKOUT_WIZARD}
      />
      <Stack.Screen
        component={UserPasswordEdit}
        name={AppRoutes.PASSWORD_EDIT}
      />
      <Stack.Screen component={AboutShop} name={AppRoutes.ABOUT_SHOP} />
      <Stack.Screen
        component={CheckoutOrder}
        name={AppRoutes.CHECKOUT_ORDER}
        options={() => ({
          headerRight: () => <HeaderRight />,
          headerLeft: () => null,
        })}
      />
      <Stack.Screen
        component={LocalNotification}
        name={AppRoutes.LOCAL_NOTIFICATION}
      />
    </Stack.Navigator>
  );
}
