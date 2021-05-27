import React, {useContext} from 'react';
import {Div, Text} from 'react-native-magnus';

import CheckoutContext from '../../../context/CheckoutContext';
import AppContext from '../../../context/AppContext';
import {useShippingByCountryId} from '../../../utils/hooks/useApp';
import {useCustomerByCustomerId} from '../../../utils/hooks/useCustomer';
import {Card} from '../../../themes/components';

export default function ShippingMethods() {
  const {
    selectedShippingAddress,
    selectedShippingMethod,
    setselectedShippingMethod,
    setselectedShippingAddress,
  } = useContext(CheckoutContext);

  const {user} = useContext(AppContext);

  useCustomerByCustomerId(user, {
    onSuccess: (res) => {
      setselectedShippingAddress(res.defaultShippingAddress);
    },
  });

  const addressId =
    selectedShippingAddress && selectedShippingAddress.country.id;

  const {isLoading, data} = useShippingByCountryId(addressId, {
    enabled: addressId,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
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
