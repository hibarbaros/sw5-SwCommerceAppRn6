import React from 'react';
import {Text} from 'react-native-magnus';

import {Container} from '../../themes/components';
import PaymentMethods from '../../components/CheckoutComponents/PaymentMethods';

export default function Step03() {
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
