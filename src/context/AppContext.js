import React, {useState, useEffect, createContext} from 'react';

// eslint-disable-next-line no-unused-vars
import {setItem, getItem, removeItem, clearAll} from '../utils/storagehelper';

const AppContext = createContext([{}, () => {}]);

export const AppProvider = ({children}) => {
  const [user, setUser] = useState(null);
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

  //user functions

  //init effect
  useEffect(() => {
    // clearAll();
    getItem('user').then((response) => {
      if (response) {
        setUser(response);
      }
    });
    getItem('wishlist').then((value) => value && setWishlist(value));
    getItem('visitedProducts').then(
      (value) => value && setVisitedProducts(value),
    );
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
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
