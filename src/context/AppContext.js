import React, {useState, useEffect, createContext} from 'react';

// eslint-disable-next-line no-unused-vars
import {setItem, getItem, removeItem, clearAll} from '../utils/storagehelper';

import {languages} from '../localization/languages';

const AppContext = createContext([{}, () => {}]);

export const AppProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [currency, setCurrency] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(3);
  const [translations, setTranslations] = useState(3);
  const [paymentMethods, setPaymentMethods] = useState(null);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [visitedProducts, setVisitedProducts] = useState([]);
  const [shippingPrice, setShippingPrice] = useState(null);

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

  const setSelectedLanguageContext = (langId) => {
    setSelectedLanguage(langId);
    setItem('selectedLanguage', langId);
  };

  useEffect(() => {
    const find = languages.find((item) => item.id === selectedLanguage).locale;
    setTranslations(find);
  }, [selectedLanguage]);

  useEffect(() => {
    // clearAll();
    getItem('user').then((v) => v && setUser(v));
    getItem('wishlist').then((v) => v && setWishlist(v));
    getItem('visitedProducts').then((v) => v && setVisitedProducts(v));
    getItem('sessionId').then((v) => v && setSessionId(v));
    getItem('selectedLanguage').then((v) => v && setSelectedLanguage(v));
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
        selectedLanguage,
        setSelectedLanguage,
        translations,
        setSelectedLanguageContext,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
