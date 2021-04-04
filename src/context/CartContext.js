import React, {useState, useEffect, createContext} from 'react';

import {setItem, getItem} from '../utils/storagehelper';

const CartContext = createContext([{}, () => {}]);

export const CartProvider = ({children}) => {
  const [userCart, setUserCart] = useState(null);

  const setInitialUserCart = (products) => {
    setUserCart(products);
    setItem('userCart', products);
  };

  useEffect(() => {
    getItem('userCart').then((v) => v && setUserCart(v));
  }, []);
  useEffect(() => {
    console.log('userCart :>> ', userCart);
  }, [userCart]);

  return (
    <CartContext.Provider
      value={{
        userCart,
        setUserCart,
        setInitialUserCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;