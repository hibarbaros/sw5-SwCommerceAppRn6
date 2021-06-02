import React, {useContext} from 'react';
import {Div, Text} from 'react-native-magnus';

import CheckoutContext from '../../../context/CheckoutContext';
import {useShippingByCountryId} from '../../../utils/hooks/useApp';
import {Card} from '../../../themes/components';

export default function ShippingMethods() {
  const {
    selectedShippingAddress,
    selectedShippingMethod,
    setselectedShippingMethod,
  } = useContext(CheckoutContext);

  const {isLoading, data} = useShippingByCountryId(
    selectedShippingAddress.country.id,
  );

  if (isLoading) {
    return null;
  }

  return (
    <Div>
      {data.map((shipping) => {
        return (
          <Card
            key={shipping.id}
            selected={selectedShippingMethod?.id === shipping.id && true}
            onPress={() => setselectedShippingMethod(shipping)}>
            <Text>{shipping.name}</Text>
            <Text>{shipping.description}</Text>
            <Text>Cost : {shipping.detail.value}</Text>
          </Card>
        );
      })}
    </Div>
  );
}
