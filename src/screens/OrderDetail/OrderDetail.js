import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {Text} from 'react-native-ui-lib';

import {Container} from '../../themes/components';
import {useOrderByOrderId} from '../../utils/hooks/useOrder';
import ProductCardOrderDetail from '../../components/Common/ProductCardOrderDetail';
import PriceWithCurrency from '../../components/Common/PriceWithCurrency';
import {LocalizationContext} from '../../context/Translations';

import {Styled} from './styles';

export default function OrderDetail({route}) {
  const {order} = route.params;
  const {translations} = useContext(LocalizationContext);

  const {isLoading, data: orderDetailData} = useOrderByOrderId(order.id);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <ScrollView>
      <Container>
        <Styled.DetailCard>
          <Styled.TextContainer>
            <Styled.TextLeft>{translations.orderNumber}</Styled.TextLeft>
            <Styled.TextRight>{orderDetailData.number}</Styled.TextRight>
          </Styled.TextContainer>
          <Styled.TextContainer>
            <Styled.TextLeft>Date</Styled.TextLeft>
            <Styled.TextRight>{orderDetailData.orderTime}</Styled.TextRight>
          </Styled.TextContainer>
          <Styled.TextContainer>
            <Styled.TextLeft>Order Status</Styled.TextLeft>
            <Styled.TextRight>
              {translations.orderStatus[orderDetailData.orderStatus.name]}
            </Styled.TextRight>
          </Styled.TextContainer>
        </Styled.DetailCard>
        <Styled.Title>Shipping Details</Styled.Title>
        <Styled.DetailCard>
          <Styled.TextContainer>
            <Styled.TextLeft>Shipping Address</Styled.TextLeft>
            <Styled.AddressContainer>
              <Styled.TextRight marginB-5>
                {orderDetailData.shipping.title}
              </Styled.TextRight>
              <Styled.TextRight marginB-5>
                {orderDetailData.shipping.firstName}{' '}
                {orderDetailData.shipping.lastName}
              </Styled.TextRight>
              <Styled.TextRight marginB-5>
                {orderDetailData.shipping.street}
              </Styled.TextRight>
              <Styled.TextRight marginB-5>
                {orderDetailData.shipping.city}
              </Styled.TextRight>
              <Styled.TextRight marginB-5>
                {orderDetailData.dispatch.name}
              </Styled.TextRight>
            </Styled.AddressContainer>
          </Styled.TextContainer>
        </Styled.DetailCard>
        <Styled.Title>Payment Details</Styled.Title>
        <Styled.DetailCard>
          <Styled.TextContainer>
            <Styled.TextLeft>Total</Styled.TextLeft>
            <Styled.CurrencyContainer>
              <Styled.TextRight marginB-5>
                <PriceWithCurrency price={orderDetailData.invoiceAmount} />
              </Styled.TextRight>
            </Styled.CurrencyContainer>
          </Styled.TextContainer>
          <Styled.TextContainer>
            <Styled.TextLeft>Shipping costs</Styled.TextLeft>
            <Styled.CurrencyContainer>
              <Styled.TextRight marginB-5>
                <PriceWithCurrency price={orderDetailData.invoiceShippingNet} />
              </Styled.TextRight>
            </Styled.CurrencyContainer>
          </Styled.TextContainer>
        </Styled.DetailCard>
        <Text text60 marginB-s3>
          Products
        </Text>
        <Styled.ProductCardContainer>
          {orderDetailData.details.map((product) => (
            <ProductCardOrderDetail product={product} />
          ))}
        </Styled.ProductCardContainer>
      </Container>
    </ScrollView>
  );
}
