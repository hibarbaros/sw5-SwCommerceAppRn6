import React, {useState, useEffect, createContext} from 'react';
import {useQuery} from 'react-query';

// eslint-disable-next-line no-unused-vars
import {setItem, getItem, removeItem, clearAll} from '../utils/storagehelper';
import {customerData} from '../utils/actions/useractions';
import {shopData, paymentsData} from '../utils/actions/appactions';

const AppContext = createContext([{}, () => {}]);

export const AppProvider = ({children}) => {
  const [user, setUser] = useState(null);
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
    removeItem('user');
    removeItem('sessionId');
    return true;
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
    // clearAll();
    getItem('user').then((v) => v && setUser(v));
    getItem('wishlist').then((v) => v && setWishlist(v));
    getItem('visitedProducts').then((v) => v && setVisitedProducts(v));
    getItem('sessionId').then((v) => v && setSessionId(v));
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
        logoutUserContext,
        wishlist,
        setWishlist,
        setVisitedProducts,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
