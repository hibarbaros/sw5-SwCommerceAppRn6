import React from 'react';
import {Text} from 'react-native-magnus';

import {Container} from '../../themes/components';
import Address from '../../components/CheckoutComponents/Address';
import ShippingMethods from '../../components/CheckoutComponents/ShippingMethods';

export default function Step03({setIsDisabled}) {
  return (
    <>
      <Container>
        <Text text60>Addresses</Text>
        <Address />
      </Container>
      <Container>
        <Text text60 marginB-s5>
          Shipping Methods
        </Text>
        <ShippingMethods setIsDisabled={setIsDisabled} />
      </Container>
    </>
  );
}
