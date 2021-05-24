import React, {useContext, useEffect} from 'react';
import {Text} from 'react-native-magnus';

import {Container} from '../../themes/components';
import PaymentMethods from '../../components/CheckoutComponents/PaymentMethods';

import CheckoutContext from '../../context/CheckoutContext';

export default function Step03({setIsNextButtonDisable}) {
  const {selectedPaymentMethod} = useContext(CheckoutContext);

  useEffect(() => {
    setIsNextButtonDisable(selectedPaymentMethod ? false : true);
  }, [selectedPaymentMethod]);

  return (
    <>
      <Container>
        <Text text60 marginB-s5>
          Payments Methods
        </Text>
        <PaymentMethods />
      </Container>
    </>
  );
}
