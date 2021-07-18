import React from 'react';

import {useAppContext} from 'context/AppContext';
import {priceWithTax} from 'utils/functions';
import {Headline} from 'themes/components';

export default function PriceWithCurrency({price, product, color}) {
  const {currency} = useAppContext();
  const parsedPrice = parseFloat(price).toFixed(2) * currency.factor;

  if (!currency.currency) {
    return null;
  }
  const priceWith = product
    ? priceWithTax(parsedPrice, product.tax.tax)
    : parsedPrice;

  const priceFormat = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency.currency,
  }).format(priceWith);

  return (
    <Headline
      variant="primarytext"
      color={color ? color : 'red'}
      bold
      fontSize={16}
      mt={10}>
      {priceFormat}
    </Headline>
  );
}
