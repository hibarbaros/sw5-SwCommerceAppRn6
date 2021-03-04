import React, {useContext} from 'react';
import {Text} from 'react-native-ui-lib';
import {useQuery} from 'react-query';

import CheckoutContext from '../../../context/CheckoutContext';

import {addressDetail} from '../../../utils/actions/addressactions';
import {Styled} from './styles';

export default function AddressCard({
  addressId,
  selectable = false,
  setModalVisible,
  selectedAddress,
}) {
  const {
    setselectedBilllingAddress,
    setselectedShippingAddress,
    setselectedShippingMethod,
  } = useContext(CheckoutContext);

  const {isLoading, data: addressData} = useQuery(
    ['userAddressCard', addressId],
    () => addressDetail(addressId),
  );

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  const handleCard = (address) => {
    setModalVisible(false);
    selectedAddress === 2 && setselectedShippingMethod(null);
    selectedAddress === 1
      ? setselectedBilllingAddress(address)
      : setselectedShippingAddress(address);
  };

  return (
    <Styled.Card onPress={() => handleCard(addressData)} disabled={!selectable}>
      <Styled.AddressText>
        {addressData.firstname} {addressData.lastname}
      </Styled.AddressText>
      <Styled.AddressText>Straße : {addressData.street}</Styled.AddressText>
      <Styled.AddressText>{addressData.city}</Styled.AddressText>
      <Styled.AddressText>{addressData.zipcode}</Styled.AddressText>
      {addressData.country && (
        <Styled.AddressText>{addressData.country.name}</Styled.AddressText>
      )}
    </Styled.Card>
  );
}
