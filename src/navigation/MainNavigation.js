import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Image, Div } from 'react-native-magnus';
// import {motion, useTransform} from 'framer-motion';

import Navigation from './Navigation';
import { useAppContext } from 'context/AppContext';
import { useCartContext } from 'context/CartContext';
import CheckoutContext from 'context/CheckoutContext';

import { customerData } from 'utils/actions/useractions';
import { shopData, paymentsData } from 'utils/actions/appactions';
import { initialCartNormalize } from 'utils/normalize/cartNormalize';

import Logo from '../assets/images/lemken-logo.png';
// const AnimatedView = motion(Div);

export default function MainScreen() {
  const { setInitialUserCart } = useCartContext();
  const { setselectedBilllingAddress, setselectedShippingAddress } = useContext(CheckoutContext);
  const {
    user,
    setUserContext,
    setCurrency,
    setPaymentMethods,
    setAllCurrencies
  } = useAppContext();

  const customerContext = useQuery('customerDataContext', () => customerData(user), {
    enabled: !!user,
    onSuccess: (userData) => {
      if (userData) {
        setInitialUserCart(initialCartNormalize(userData.basket));
        setUserContext(userData.id, userData.sessionId);
        setselectedBilllingAddress(userData.defaultBillingAddress);
        setselectedShippingAddress(userData.defaultShippingAddress);
      }
    }
  });

  const shopContext = useQuery('shopContext', () => shopData(), {
    onSuccess: (data) => {
      const [mainCurrencies] = data.currencies;
      setAllCurrencies(data.currencies);
      setCurrency(mainCurrencies);
    }
  });

  const paymentContext = useQuery('paymentContext', () => paymentsData(), {
    onSuccess: (data) => setPaymentMethods(data)
  });

  // const opacity = useTransform(() => ({
  //   opacity: 1,
  //   from: {opacity: 0},
  // }));

  const navigationLoaded =
    paymentContext.isSuccess && shopContext.isSuccess && customerContext.isSuccess;

  return (
    <>
      {!navigationLoaded ? (
        <Div
          // style={opacity}
          w="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Image h={70} w={300} source={Logo} />
        </Div>
      ) : (
        <Navigation />
      )}
    </>
  );
}
