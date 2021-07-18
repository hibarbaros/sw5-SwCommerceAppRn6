import React from 'react';
import {ScrollView} from 'react-native';
import {Div, Text} from 'react-native-magnus';

import {Container, Headline, Paragraph} from '../../themes/components';
import {useOrderByOrderId} from '../../utils/hooks/useOrder';
// import ProductCard from '../../components/Common/ProductCard';
import PriceWithCurrency from '../../components/Common/PriceWithCurrency';
import {useLocalizationContext} from '../../context/Translations';

export default function OrderDetail({route}) {
  const {order} = route.params;
  const {translations} = useLocalizationContext();

  const {isLoading, data} = useOrderByOrderId(order.id);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <ScrollView>
      <Container>
        <Headline variant="h1" bold mb={10}>
          {translations.orderNumber} : {data.number}
        </Headline>
        <StyledRow>
          <Headline variant="h4" bold>
            Date
          </Headline>
          <Paragraph>{data.orderTime}</Paragraph>
        </StyledRow>
        <StyledRow>
          <Headline variant="h4" bold>
            Order Status
          </Headline>
          <Paragraph>
            {translations.orderStatus[data.orderStatus.name]}
          </Paragraph>
        </StyledRow>
        <StyledRow>
          <Headline variant="h1" bold>
            Shipping Details
          </Headline>
        </StyledRow>
        {data.shipping.title && (
          <StyledRow>
            <Paragraph bold fontSize={20}>
              {data.shipping.title}
            </Paragraph>
          </StyledRow>
        )}
        <StyledRow>
          <Paragraph bold fontSize={20}>
            {data.shipping.firstName} {data.shipping.lastName}
          </Paragraph>
        </StyledRow>
        <StyledRow>
          <Paragraph bold fontSize={20}>
            {data.shipping.street}
          </Paragraph>
        </StyledRow>
        <StyledRow>
          <Paragraph bold fontSize={20}>
            {data.shipping.city}
          </Paragraph>
        </StyledRow>
        <StyledRow>
          <Paragraph bold fontSize={20}>
            {data.shipping.name}
          </Paragraph>
        </StyledRow>
        <StyledRow>
          <Headline variant="h1" bold>
            Payment Details
          </Headline>
        </StyledRow>
        <StyledRow>
          <Paragraph bold fontSize={20}>
            {data.shipping.name}
          </Paragraph>
        </StyledRow>
        <StyledRow>
          <Headline variant="h4" bold>
            Total
          </Headline>
          <PriceWithCurrency price={data.invoiceAmount} />
        </StyledRow>
        <StyledRow>
          <Headline variant="h4" bold>
            Shipping costs
          </Headline>
          <PriceWithCurrency price={data.invoiceShippingNet} />
        </StyledRow>
        {/* <Text text60 marginB-s3>
          Products
        </Text>
        <Styled.ProductCardContainer>
          {data.details.map((product) => (
            <ProductCard productId={product.articleId} />
          ))}
        </Styled.ProductCardContainer> */}
      </Container>
    </ScrollView>
  );
}

const StyledRow = ({children}) => (
  <Div row justifyContent="space-between" alignItems="flex-end" my={10}>
    {children}
  </Div>
);
