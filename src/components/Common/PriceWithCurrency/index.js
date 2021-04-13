import React, {useContext} from 'react';
import {Text} from 'react-native';
import AppContext from '../../../context/AppContext';
import {priceWithTax} from '../../../utils/functions';

export default function PriceWithCurrency({price, product}) {
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
    maximumSignificantDigits: 3,
  }).format(priceWith);

  return <Text>{priceFormat}</Text>;
}
