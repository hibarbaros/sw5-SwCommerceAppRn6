import React from 'react';

import CartBox from '../../components/Common/CartBox';
import {Container} from '../../themes/components';

const CartScreen = ({initialCart}) => {
  return (
    <Container>
      {initialCart.map((product, index) => (
        <CartBox
          key={index}
          productId={product.id}
          productNumber={product.number}
          quantity={product.quantity}
        />
      ))}
    </Container>
  );
};

export default CartScreen;
