import React, {useContext} from 'react';
import {Div} from 'react-native-magnus';
//*components
import PriceWithCurrency from '../PriceWithCurrency';
import {Headline, Container} from '../../../themes/components';
//*utils
import {useUserCartTotalPrice} from '../../../utils/hooks/useCart';
//*context
import CheckoutContext from '../../../context/CheckoutContext';

export default function CartTotalPrice() {
  const {selectedShippingMethod} = useContext(CheckoutContext);

  const {data} = useUserCartTotalPrice();
  const shippingPrice = selectedShippingMethod
    ? parseFloat(selectedShippingMethod.detail.value)
    : 0;

  return (
    <Container>
      <Div borderColor="light" borderRadius={5} borderWidth={1} p={10}>
        <Div row justifyContent="space-between" alignItems="flex-end">
          <Headline variant="h5" bold>
            Summe
          </Headline>
          <PriceWithCurrency price={data?.netPrice} />
        </Div>
        <Div row justifyContent="space-between" alignItems="flex-end">
          <Headline variant="h5" bold>
            Versandkosten
          </Headline>
          <PriceWithCurrency
            price={
              selectedShippingMethod ? selectedShippingMethod.detail.value : 0
            }
          />
        </Div>
        <Div row justifyContent="space-between" alignItems="flex-end">
          <Headline variant="h5" bold>
            Gesamtsumme
          </Headline>
          <PriceWithCurrency price={data?.netPrice + shippingPrice} />
        </Div>
        <Div row justifyContent="space-between" alignItems="flex-end">
          <Headline variant="h5" bold>
            Tax
          </Headline>
          <PriceWithCurrency price={data?.taxPrice} />
        </Div>
        <Div
          row
          mt={10}
          justifyContent="space-between"
          alignItems="flex-end"
          borderTopColor="light"
          borderTopWidth={1}>
          <Headline variant="h3" bold>
            Total Price
          </Headline>
          <PriceWithCurrency
            price={data?.netPrice + data?.taxPrice + shippingPrice}
          />
        </Div>
      </Div>
    </Container>
  );
}
