import React, {useState, useEffect, createContext} from 'react';
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
import {setItem, getItem, removeItem, clearAll} from '../utils/storagehelper';

const AppContext = createContext([{}, () => {}]);

export const AppProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isCart, setIsCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const [whislist, setWhislist] = useState([]);
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
      setIsCart(1);
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
    setIsCart(0);
    return true;
  };

  const customerActions = {
    customerVisitedProducts: function (product) {
      let products = [...visitedProducts];
      const finded = _.find(products, {id: product.id});
      if (!finded) {
        if (products.length > 9) {
          const last = _.first(products);
          _.remove(products, {id: last.id});
        }
        products.push(product);
        setVisitedProducts(products);
        setItem('visitedproducts', products);
      }
    },
  };

  //user functions

  //wishlist functions
  const whislistActions = {
    addToWish: async function (product) {
      let products = [];
      if (whislist) {
        products = [...whislist];
      }
      const findProduct = _.filter(products, {id: product.id});
      if (findProduct.length === 0) {
        products.push(product);
      }
      setWhislist(products);
      setItem('whislist', products);
    },
    removeToWish: function (product) {
      let products = [];
      if (whislist) {
        products = [...whislist];
      }
      _.remove(products, {id: product.id});
      setWhislist(products);
      setItem('whislist', products);
    },
    checkToWish: function (productId) {
      return new Promise((resolve) => {
        const findProduct = _.filter(whislist, {id: productId});
        if (findProduct.length === 0) {
          return resolve(false);
        }
        if (findProduct.length > 0) {
          return resolve(true);
        }
      });
    },
  };

  //wishlist functions

  //init effect
  useEffect(() => {
    // clearAll();
    getItem('user').then((response) => {
      if (response) {
        setUser(response);
        setIsCart(1);
      } else {
        setIsCart(0);
      }
    });
    getItem('whislist').then((value) => value && setWhislist(value));
    getItem('visitedproducts').then(
      (value) => value && setVisitedProducts(value),
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        customerActions,
        whislistActions,
        currency,
        setCurrency,
        whislist,
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
        setIsCart,
        isCart,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
