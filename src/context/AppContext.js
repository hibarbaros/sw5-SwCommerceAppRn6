import React, {useState, useEffect, createContext} from 'react';
import {useQuery} from 'react-query';
import DeviceInfo from 'react-native-device-info';

// eslint-disable-next-line no-unused-vars
import {setItem, getItem, removeItem, clearAll} from '../utils/storagehelper';
import {customerData} from '../utils/actions/useractions';
import {shopData, paymentsData} from '../utils/actions/appactions';

const AppContext = createContext([{}, () => {}]);

export const AppProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [userCart, setUserCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [currency, setCurrency] = useState('');
  const [paymentMethods, setPaymentMethods] = useState(null);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [visitedProducts, setVisitedProducts] = useState([]);
  const [shippingPrice, setShippingPrice] = useState(null);

  //user functions

  const setUserContext = (userId, userSessionId) => {
    if (userId) {
      setUser(userId);
      setItem('user', userId);
    }
    setSessionId(userSessionId);
    setItem('sessionId', userSessionId);
  };

  const logoutUserContext = () => {
    setUser(null);
    setSessionId(null);
    setCartCount(0);
    removeItem('user');
    removeItem('sessionId');
    return true;
  };

  const setInitialUserCart = (products) => {
    setUserCart(products);
    setItem('userCart', products);
  };

  //user functions

  useQuery('customerDataContext', () => customerData(user), {
    enabled: !!user,
    onSuccess: (res) => {
      if (res) {
        setUserContext(res.id, res.sessionId);
      }
    },
  });

  useQuery('shopContext', () => shopData(), {
    onSuccess: (data) => setCurrency(data.currencies[0]),
  });

  useQuery('paymentContext', () => paymentsData(), {
    onSuccess: (data) => setPaymentMethods(data),
  });

  useEffect(() => {
    if (!user) {
      const uniqueId = DeviceInfo.getUniqueId();
      setUserContext(null, uniqueId);
    }
  }, [user]);

  useEffect(() => {
    // clearAll();
    getItem('user').then((v) => v && setUser(v));
    getItem('wishlist').then((v) => v && setWishlist(v));
    getItem('userCart').then((v) => v && setUserCart(v));
    getItem('visitedProducts').then((v) => v && setVisitedProducts(v));
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        currency,
        setCurrency,
        paymentMethods,
        selectedShippingAddress,
        setSelectedShippingAddress,
        selectedBillingAddress,
        setSelectedBillingAddress,
        visitedProducts,
        shippingPrice,
        setShippingPrice,
        setUser,
        sessionId,
        setSessionId,
        setUserContext,
        setPaymentMethods,
        cartCount,
        setCartCount,
        logoutUserContext,
        wishlist,
        setWishlist,
        setVisitedProducts,
        userCart,
        setInitialUserCart,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
