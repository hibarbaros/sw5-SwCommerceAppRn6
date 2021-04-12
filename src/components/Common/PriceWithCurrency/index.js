import React, {useContext} from 'react';
import {Text} from 'react-native';
import AppContext from '../../../context/AppContext';
import {priceWithTax} from '../../../utils/functions';

export default function PriceWithCurrency({price, product}) {
  const {currency} = useContext(AppContext);
  const parsedPrice = parseFloat(price);

  const priceWith = product
    ? priceWithTax(parsedPrice, product.tax.tax)
    : parsedPrice;

  const priceFormat = (priceWith * currency.factor).toLocaleString('de-DE', {
    style: 'currency',
    currency: currency.currency,
    minimumFractionDigits: 2,
  });
  return currency ? <Text>{priceFormat}</Text> : null;
}
