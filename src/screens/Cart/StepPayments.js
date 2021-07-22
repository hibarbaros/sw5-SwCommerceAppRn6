import React, { useEffect } from 'react';

import { Container, Headline } from 'themes/components';
import PaymentMethods from 'components/CheckoutComponents/PaymentMethods';

import { useCheckoutContext } from 'context/CheckoutContext';

export default function StepPayments({ setIsNextButtonDisable }) {
  const { selectedPaymentMethod } = useCheckoutContext();

  useEffect(() => {
    setIsNextButtonDisable(selectedPaymentMethod ? false : true);
  }, [selectedPaymentMethod]);

  return (
    <>
      <Container>
        <Headline>Payments Methods</Headline>
        <PaymentMethods />
      </Container>
    </>
  );
}
