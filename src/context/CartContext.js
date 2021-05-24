import React, {useState, useEffect, createContext} from 'react';

import {setItem, getItem} from '../utils/storagehelper';

const CartContext = createContext([{}, () => {}]);

export const CartProvider = ({children}) => {
  const [userCart, setUserCart] = useState([]);

  const setInitialUserCart = (products) => {
    if (products.length > 0) {
      setUserCart(products);
      setItem('userCart', products);
    } else {
      setUserCart(null);
      setItem('userCart', null);
    }
  };

  useEffect(() => {
    getItem('userCart').then((v) => v && setUserCart(v));
  }, []);

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
