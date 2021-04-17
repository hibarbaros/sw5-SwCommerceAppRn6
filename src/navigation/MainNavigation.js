import React, {useContext} from 'react';
import {useQuery} from 'react-query';
import {Image, Div} from 'react-native-magnus';
import {useSpring, animated} from 'react-spring';

import Navigation from './Navigation';
import AppContext from '../context/AppContext';
import CartContext from '../context/CartContext';

import {customerData} from '../utils/actions/useractions';
import {shopData, paymentsData} from '../utils/actions/appactions';
import {initialCartNormalize} from '../utils/normalize/cartNormalize';

import Logo from '../assets/images/lemken-logo.png';
const AnimatedView = animated(Div);

export default function MainScreen() {
  const [isLoading, setIsLoading] = React.useState(true);
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

  const [props] = useSpring(() => ({
    opacity: 1,
    from: {opacity: 0},
  }));

  React.useEffect(() => {
    setTimeout(() => {
      // set({opacity: 0});
      setIsLoading(false);
    }, 2000);
  }, [paymentContext.isLoading, shopContext.isLoading]);

  return (
    <>
      {isLoading ? (
        <AnimatedView
          style={props}
          w="100%"
          height="100%"
          justifyContent="center"
          alignItems="center">
          <Image h={70} w={300} source={Logo} />
        </AnimatedView>
      ) : (
        <Navigation />
      )}
    </>
  );
}
