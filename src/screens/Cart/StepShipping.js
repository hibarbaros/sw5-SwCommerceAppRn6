import React, { useEffect } from 'react';

import { Container, Headline } from 'themes/components';
import ShippingMethods from 'components/CheckoutComponents/ShippingMethods';

import { useCheckoutContext } from 'context/CheckoutContext';

export default function StepShipping({ setIsNextButtonDisable }) {
  const { selectedShippingMethod } = useCheckoutContext();

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
