import React from 'react';
import { Div } from 'react-native-magnus';

import { Headline } from 'themes/components';
import Address from 'components/CheckoutComponents/Address';

export default function Step02({ setIsNextButtonDisable }) {
  return (
    <>
      <Div my={10}>
        <Headline>Addresses</Headline>
      </Div>
      <Address />
    </>
  );
}
