import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Div} from 'react-native-magnus';

import AppRoute from 'utils/approutes';
import PriceWithCurrency from 'components/Common/PriceWithCurrency';
import {Headline, Paragraph, Button} from 'themes/components';

export default function UserOrderCard({order}) {
  const navigation = useNavigation();

  return (
    <Div borderColor="light" borderRadius={5} borderWidth={1} p={10}>
      <Headline variant="h1" bold mb={10}>
        Order No : {order.ordernumber}
      </Headline>
      <Div row justifyContent="space-between" alignItems="flex-end" mb={10}>
        <Headline variant="h4" bold>
          Order at
        </Headline>
        <Paragraph>{order.ordertime}</Paragraph>
      </Div>
      <Div row justifyContent="space-between" alignItems="flex-end" mb={10}>
        <Headline variant="h4" bold>
          Order Status
        </Headline>
        {/* TODO: dinamik order status gelmeli */}
        <Paragraph>{order.status}</Paragraph>
      </Div>
      <Div row justifyContent="space-between" alignItems="flex-end" mb={10}>
        <Headline variant="h4" bold>
          Items
        </Headline>
        {/* TODO: dinamik sayi gelmeli */}
        <Paragraph>1</Paragraph>
      </Div>
      <Div row justifyContent="space-between" alignItems="flex-end" mb={10}>
        <Headline variant="h4" bold>
          Price
        </Headline>
        <PriceWithCurrency price={order.invoice_amount} />
      </Div>
      <Button
        text="Order Detail"
        onPress={() =>
          navigation.navigate(AppRoute.ORDER_DETAIL, {order: order})
        }
      />
    </Div>
  );
}
