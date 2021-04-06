import React from 'react';

import CartBox from '../../components/Common/CartBox';
import {Container} from '../../themes/components';

const CartScreen = ({userCart}) => {
  return (
    <Container>
      {userCart.map((product, index) => (
        <CartBox key={index} product={product} />
      ))}
    </Container>
  );
};

export default CartScreen;
