import React, {useContext, useEffect} from 'react';

import {Container, Headline} from '../../themes/components';
import ShippingMethods from '../../components/CheckoutComponents/ShippingMethods';

import CheckoutContext from '../../context/CheckoutContext';

export default function StepShipping({setIsNextButtonDisable}) {
  const {selectedShippingMethod} = useContext(CheckoutContext);

  useEffect(() => {
    setIsNextButtonDisable(selectedShippingMethod ? false : true);
  }, [selectedShippingMethod]);

  return (
    <Container>
      <Headline>Shipping Methods</Headline>
      <ShippingMethods />
    </Container>
  );
}
