import React, {useContext} from 'react';
import {Text} from 'react-native';
import {useQuery} from 'react-query';

import Navigation from './Navigation';
import AppContext from '../context/AppContext';
import CartContext from '../context/CartContext';

import {customerData} from '../utils/actions/useractions';
import {shopData, paymentsData} from '../utils/actions/appactions';
import {initialCartNormalize} from '../utils/normalize/cartNormalize';

export default function MainScreen() {
  const {setInitialUserCart} = useContext(CartContext);
  const {
    user,
    setUserContext,
    setCurrency,
    setPaymentMethods,
    setAllCurrencies,
  } = useContext(AppContext);

  useQuery('customerDataContext', () => customerData(user), {
    enabled: !!user,
    onSuccess: (res) => {
      if (res) {
        setInitialUserCart(initialCartNormalize(res.basket));
        setUserContext(res.id, res.sessionId);
      }
    },
  });

  const shopContext = useQuery('shopContext', () => shopData(), {
    onSuccess: (data) => {
      const [mainCurrencies] = data.currencies;
      setAllCurrencies(data.currencies);
      setCurrency(mainCurrencies);
    },
  });

  const paymentContext = useQuery('paymentContext', () => paymentsData(), {
    onSuccess: (data) => setPaymentMethods(data),
  });

  return (
    <>
      {paymentContext.isLoading && shopContext.isLoading ? (
        <Text>Loading</Text>
      ) : (
        <Navigation />
      )}
    </>
  );
}
