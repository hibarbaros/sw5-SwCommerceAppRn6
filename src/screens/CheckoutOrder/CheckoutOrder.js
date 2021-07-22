import React from 'react';

import { useOrderByOrderId } from 'utils/hooks/useOrder';
import { Container, Button, Text } from 'themes/components';

export default function CheckoutOrder({ route, navigation }) {
  const { orderId } = route.params;

  const { isLoading, error, data: initialOrder } = useOrderByOrderId(orderId, {
    onSuccess: () => {
      //   cartActions.emptyCart();
    }
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <Container>
      <>
        <Text>Herzlichen Glückwunsch</Text>
        <Text>Ihr Einkauf war erfolgrich</Text>
        <Text>Order NUmber : {initialOrder.number}</Text>
        <Text>Versand : {initialOrder.dispatch.name}</Text>
        <Button text="Go To Home" onPress={() => navigation.popToTop()} />
      </>
    </Container>
  );
}
