import React from 'react';

import CartBox from '../../components/Common/CartBox';
import {Container} from '../../themes/components';

const CartScreen = ({cart}) => {
  return (
    <Container>
      {cart.map((product, index) => (
        <CartBox
          key={index}
          productId={product.articleId}
          quantity={product.quantity}
        />
      ))}
    </Container>
  );
};

export default CartScreen;