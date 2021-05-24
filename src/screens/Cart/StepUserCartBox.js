import React from 'react';

import CartBox from '../../components/Common/CartBox';

const CartScreen = ({userCart}) => {
  return userCart.map((product, index) => (
    <CartBox key={index} product={product} />
  ));
};

export default CartScreen;
