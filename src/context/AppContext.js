import React, {useState, useEffect, createContext, useContext} from 'react';

import {setItem, getItem, removeItem} from '../utils/storagehelper';

const AppContext = createContext([{}, () => {}]);

export const AppProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [currency, setCurrency] = useState('');
  const [allCurrencies, setAllCurrencies] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState(null);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [visitedProducts, setVisitedProducts] = useState([]);
  const [shippingPrice, setShippingPrice] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(3);
  const [selectedTranslate, setSelectedTranslate] = useState(0);

  const setSelectedLanguageContext = (langId) => {
    setSelectedLanguage(langId);
    setItem('selectedLanguage', langId);
  };
  const setSelectedTranslateContext = (translateId) => {
    setSelectedTranslate(translateId);
    setItem('selectedTranslate', translateId);
  };
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
  };

  useEffect(() => {
    // removeItem('visitedProducts');
    getItem('user').then((v) => v && setUser(v));
    getItem('wishlist').then((v) => v && setWishlist(v));
    getItem('visitedProducts').then((v) => v && setVisitedProducts(v));
    getItem('sessionId').then((v) => v && setSessionId(v));
    getItem('selectedLanguage').then((v) =>
      v ? setSelectedLanguage(v) : setSelectedLanguage(3),
    );
    getItem('selectedTranslate').then((v) =>
      v ? setSelectedTranslate(v) : setSelectedTranslate(0),
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
        logoutUserContext,
        wishlist,
        setWishlist,
        setVisitedProducts,
        setSelectedLanguageContext,
        selectedLanguage,
        allCurrencies,
        setAllCurrencies,
        setSelectedTranslateContext,
        selectedTranslate,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

export const useAppContext = () => {
  return useContext(AppContext);
};
