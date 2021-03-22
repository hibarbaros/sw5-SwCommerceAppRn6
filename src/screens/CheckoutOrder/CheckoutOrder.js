import React from 'react';
import {Text} from 'react-native-ui-lib';

import {useOrderByOrderId} from '../../utils/hooks/useOrder';
import {Container, Button} from '../../themes/components';

export default function CheckoutOrder({route, navigation}) {
  const {orderId} = route.params;

  const {isLoading, error, data: initialOrder} = useOrderByOrderId(orderId, {
    onSuccess: () => {
      //   cartActions.emptyCart();
    },
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
        <Text text60>Herzlichen Glückwunsch</Text>
        <Text text60>Ihr Einkauf war erfolgrich</Text>
        <Text marginT-s5>Order NUmber : {initialOrder.number}</Text>
        <Text marginT-s5>Versand : {initialOrder.dispatch.name}</Text>
        <Button text="Go To Home" onPress={() => navigation.popToTop()} />
      </>
    </Container>
  );
}
