import React, {useContext} from 'react';
import {Text} from 'react-native';
import AppContext from '../../../context/AppContext';
import {priceWithTax} from '../../../utils/functions';

export default function PriceWithCurrency({price, product}) {
  const {currency} = useContext(AppContext);
  const floatPrice = parseFloat(price, 10);

  const priceWith = product
    ? priceWithTax(floatPrice, product.tax.tax)
    : floatPrice;

  return currency ? (
    <Text>
      {`${currency.templatechar} ${(priceWith * currency.factor).toFixed(2)}`}
    </Text>
  ) : null;
}
