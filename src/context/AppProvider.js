import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import Reactotron from 'reactotron-react-native';
import database from '@react-native-firebase/database';

import {useQuery} from 'react-query';

import AppContext from './AppContext';
import {shopData, paymentsData} from '../utils/actions/appactions';
import storageHelper from '../utils/storagehelper';

// import useStateWrapper from '../config/reactotronStateWatcher';
// const useState = useStateWrapper(useStateOverride);

const AppProvider = (props) => {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [userCart, setUserCart] = useState(null);
  const [whislist, setWhislist] = useState([]);
  const [currency, setCurrency] = useState('');
  const [paymentMethods, setPaymentMethods] = useState(null);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [visitedProducts, setVisitedProducts] = useState([]);
  const [shippingPrice, setShippingPrice] = useState(null);

  Reactotron.onCustomCommand({
    command: 'user',
    handler: () => {
      console.tron.error(user);
    },
  });

  //user functions

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
        storageHelper._set('visitedproducts', products);
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
      storageHelper._set('whislist', products);
      database()
        .ref(`users/${user}/whislist`)
        .set({
          ...products,
        });
    },
    removeToWish: function (product) {
      let products = [];
      if (whislist) {
        products = [...whislist];
      }
      _.remove(products, {id: product.id});
      setWhislist(products);
      storageHelper._set('whislist', products);
      // database()
      //   .ref(`users/${user}/whislist`)
      //   .set({
      //     ...products,
      //   });
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

  //cart functions
  const cartActions = {
    emptyCart: function () {
      try {
        setUserCart(null);
        storageHelper._remove('userCart');
        setCartCount(0);
        storageHelper._set('cartCount', 0);
      } catch (e) {
        return false;
      }
    },
    addToCart: function (product) {
      let products = [];
      if (userCart) {
        products = [...userCart];
      }

      const findProduct = _.filter(products, {id: product.id});
      if (findProduct.length > 0) {
        findProduct[0].quantity += 1;
      }
      if (findProduct.length === 0) {
        product.quantity = 1;
        products.push(product);
      }

      setUserCart(products);
      storageHelper._set('userCart', products);
      setCartCount(cartCount + 1);
      storageHelper._set('cartCount', cartCount + 1);
    },
    removeToCart: function (productId) {
      _.remove(userCart, {id: productId});
      cartActions.setCart(userCart);
      cartActions._setCartCount();
    },
    setCart: function (userCartData) {
      setUserCart(userCartData);
      storageHelper._set('userCart', userCartData);
    },
    _setCartCount: function () {
      let total = 0;
      userCart.forEach((e, index) => {
        const q = userCart[index].quantity;
        total += q;
      });
      setCartCount(total);
      storageHelper._set('cartCount', total);
    },
  };
  //cart functions

  useQuery('shopContext', () => shopData(), {
    onSuccess: (data) => setCurrency(data.currencies[0]),
  });

  useQuery('paymentContext', () => paymentsData(), {
    onSuccess: (data) => setPaymentMethods(data),
  });

  //init effect
  useEffect(() => {
    // storageHelper._remove('user');
    storageHelper._get('user').then((response) => {
      response && setUser(response);
    });
    storageHelper._get('userCart').then((value) => value && setUserCart(value));
    storageHelper
      ._get('cartCount')
      .then((value) => value && setCartCount(value));
    storageHelper._get('whislist').then((value) => value && setWhislist(value));
    storageHelper
      ._get('visitedproducts')
      .then((value) => value && setVisitedProducts(value));
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        customerActions,
        cartCount,
        userCart,
        cartActions,
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
        setUserCart,
        setCartCount,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
