import React, {useContext} from 'react';

import AppContext from '../../../context/AppContext';
import {priceWithTax} from '../../../utils/functions';
import {Headline} from '../../../themes/components';

export default function PriceWithCurrency({price, product, color}) {
  const {currency} = useContext(AppContext);
  const parsedPrice = parseFloat(price);

  if (!currency.currency) {
    return null;
  }
  const priceWith = product
    ? priceWithTax(parsedPrice, product.tax.tax)
    : parsedPrice;

  const priceFormat = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency.currency,
    maximumSignificantDigits: 2,
  }).format(priceWith);

  return (
    <Headline
      variant="primarytext"
      color={color ? color : 'red'}
      bold
      fontSize="3xl"
      mt={10}>
      {priceFormat}
    </Headline>
  );
}
