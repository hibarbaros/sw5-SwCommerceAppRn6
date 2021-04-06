import React, {useContext} from 'react';
import {Text} from 'react-native';
import AppContext from '../../../context/AppContext';
import {priceWithTax} from '../../../utils/functions';

export default function PriceWithCurrency({price, product}) {
  const {currency} = useContext(AppContext);
  const parsedPrice = parseFloat(price);

  const priceWith = product
    ? priceWithTax(price, product.tax.tax)
    : parsedPrice;

  return currency ? (
    <Text>
      {`${currency.templatechar} ${(priceWith * currency.factor).toFixed(2)}`}
    </Text>
  ) : null;
}
