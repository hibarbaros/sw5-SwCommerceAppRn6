import React from 'react';

import {Container, Headline} from '../../themes/components';
import ShippingMethods from '../../components/CheckoutComponents/ShippingMethods';

export default function Step02() {
  return (
    <Container>
      <Headline>Shipping Methods</Headline>
      <ShippingMethods />
    </Container>
  );
}
