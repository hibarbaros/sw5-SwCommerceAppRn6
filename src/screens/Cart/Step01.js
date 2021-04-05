import React from 'react';

import CartBox from '../../components/Common/CartBox';
import {Container} from '../../themes/components';

const CartScreen = ({userCart}) => {
  return (
    <Container>
      {userCart.map((product, index) => (
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
