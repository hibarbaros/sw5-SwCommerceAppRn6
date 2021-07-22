import React from 'react';

import CartBox from 'components/Common/CartBox';

const StepUserCartBox = ({ userCart }) => {
  return userCart.map((product, index) => <CartBox key={index} product={product} />);
};

export default StepUserCartBox;
