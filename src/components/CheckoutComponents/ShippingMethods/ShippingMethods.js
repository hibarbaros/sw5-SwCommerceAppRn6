import React, {useState, useContext} from 'react';
import {View, Text} from 'react-native';

import CheckoutContext from '../../../context/CheckoutContext';
import AppContext from '../../../context/AppContext';
import {useShippingByCountryId} from '../../../utils/hooks/useApp';
import {useCustomerByCustomerId} from '../../../utils/hooks/useCustomer';
import {Styled} from './styles';

export default function ShippingMethods() {
  const {
    selectedShippingAddress,
    setselectedShippingMethod,
    setselectedShippingAddress,
  } = useContext(CheckoutContext);

  const {user} = useContext(AppContext);

  const [isSelected, setIsSelected] = useState(null);

  const {
    data: customerData,
    isLoading: customerDataLoading,
  } = useCustomerByCustomerId(user, {
    onSuccess: (res) => {
      console.log('data', res);
      setselectedShippingAddress(res.defaultShippingAddress);
    },
  });

  //   if (customerDataLoading) {
  //     return <Text>Loading...</Text>;
  //   }

  //   console.log(
  //     'customerData.defaultShippingAddress',
  //     customerData.defaultShippingAddress.country.id,
  //   );

  const addressId =
    selectedShippingAddress && selectedShippingAddress.country.id;
  console.log(
    '🚀 ~ file: ShippingMethods.js ~ line 34 ~ ShippingMethods ~ addressId',
    addressId,
  );

  const {
    isLoading: shippingsDataLoading,
    data: shippingsData,
  } = useShippingByCountryId(addressId, {
    enabled: addressId,
  });

  if (shippingsDataLoading) {
    return <Text>Loading...</Text>;
  }

  const handleCard = (shipping) => {
    setIsSelected(shipping.id);
    setselectedShippingMethod(shipping);
  };

  return (
    <View>
      {shippingsData.map((shipping) => {
        return (
          <Styled.AddressCard
            key={shipping.id}
            selected={isSelected === shipping.id && true}
            onPress={() => handleCard(shipping)}>
            <Text>{shipping.name}</Text>
            <Text>{shipping.description}</Text>
            <Text>Cost : {shipping.detail.value}</Text>
          </Styled.AddressCard>
        );
      })}
    </View>
  );
}
