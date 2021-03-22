import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@ui-kitten/components';

import AppRoute from '../../../utils/approutes';
import {TrashIcon} from '../../../themes/components/IconSet';

import {Styled} from './styles';

export default function UserAddressCard({setisTooltip, userData, addressData}) {
  const navigation = useNavigation();

  const parsedId = parseInt(addressData.id, 10);

  return (
    <>
      <Styled.Card>
        {parsedId === userData.defaultBillingAddress.id && (
          <Styled.InfoText>Default Billing Addres</Styled.InfoText>
        )}
        {parsedId === userData.defaultShippingAddress.id && (
          <Styled.InfoText>Default Shipping Addres</Styled.InfoText>
        )}
        <Styled.AddressText>
          {addressData.firstname} {addressData.lastname}
        </Styled.AddressText>
        <Styled.AddressText>Straße : {addressData.street}</Styled.AddressText>
        <Styled.AddressText>{addressData.city}</Styled.AddressText>
        <Styled.AddressText>{addressData.zipcode}</Styled.AddressText>
        {addressData.country && (
          <Styled.AddressText>{addressData.country.name}</Styled.AddressText>
        )}

        <Styled.ButtonsContainer>
          <Button
            status="danger"
            accessoryLeft={TrashIcon}
            onPress={() => setisTooltip(addressData.id)}
          />
          <Styled.EditButton
            status="info"
            onPress={() =>
              navigation.navigate(AppRoute.ADDRESS_ADD, {
                userAddress: addressData,
                userData,
              })
            }>
            Edit
          </Styled.EditButton>
        </Styled.ButtonsContainer>
      </Styled.Card>
    </>
  );
}
