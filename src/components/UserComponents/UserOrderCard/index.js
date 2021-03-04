import React from 'react';
import {useNavigation} from '@react-navigation/native';

import AppRoute from '../../../utils/approutes';
import PriceWithCurrency from '../../Common/PriceWithCurrency';

import {Styled} from './styles';

export default function UserOrderCard({order}) {
  const navigation = useNavigation();

  return (
    <Styled.OrderCard disabled>
      <Styled.OrderNumber>{order.ordernumber}</Styled.OrderNumber>
      <Styled.TextContainer>
        <Styled.OrderText>Order at</Styled.OrderText>
        <Styled.OrderTextRight>{order.ordertime}</Styled.OrderTextRight>
      </Styled.TextContainer>
      <Styled.TextContainer>
        <Styled.OrderText>Order Status</Styled.OrderText>
        <Styled.OrderTextRight>Shipping</Styled.OrderTextRight>
      </Styled.TextContainer>
      <Styled.TextContainer>
        <Styled.OrderText>Items</Styled.OrderText>
        <Styled.OrderTextRight>1 Items purchased</Styled.OrderTextRight>
      </Styled.TextContainer>
      <Styled.TextContainer>
        <Styled.OrderText>Price</Styled.OrderText>
        <PriceWithCurrency price={order.invoice_amount} />
      </Styled.TextContainer>
      <Styled.ButtonContainer>
        <Styled.DetailButton
          status="outline"
          onPress={() =>
            navigation.navigate(AppRoute.ORDER_DETAIL, {order: order})
          }>
          Order Detail
        </Styled.DetailButton>
      </Styled.ButtonContainer>
    </Styled.OrderCard>
  );
}
