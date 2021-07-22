import React, { useContext } from 'react';

import CheckoutContext from 'context/CheckoutContext';
import { usePaymentMethods } from 'utils/hooks/useApp';
import { Card, Text } from 'themes/components';

export default function PaymentMethods() {
  const { selectedPaymentMethod, setselectedPaymentMethod } = useContext(CheckoutContext);

  const { isLoading, data } = usePaymentMethods();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return data.map((item) => (
    <Card
      key={item.id}
      selected={selectedPaymentMethod?.id === item.id && true}
      onPress={() => setselectedPaymentMethod(item)}
    >
      <Text variant="medium">{item.description}</Text>
    </Card>
  ));
}
