import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Div } from 'react-native-magnus';

import AppRoute from 'utils/approutes';
import { Card, Text, IconButton, Button } from 'themes/components';

export default function UserAddressCard({ handleSetTooltip, userData, addressData }) {
  const navigation = useNavigation();

  const parsedId = parseInt(addressData.id, 10);

  const checkBillingAddress = parsedId === userData.defaultBillingAddress.id;
  const checkShippingAddress = parsedId === userData.defaultShippingAddress.id;

  return (
    <Card>
      {checkBillingAddress && <Text variant="largeTitle">Default Billing Addres</Text>}
      {checkShippingAddress && <Text variant="largeTitle">Default Shipping Addres</Text>}
      <Text variant="medium">
        {addressData.firstname} {addressData.lastname}
      </Text>
      <Text variant="medium">Straße : {addressData.street}</Text>
      <Text variant="medium">{addressData.city}</Text>
      <Text variant="medium">{addressData.zipcode}</Text>
      {addressData.country && <Text variant="medium">{addressData.country.name}</Text>}

      <Div row>
        <Div mr={5}>
          <IconButton
            iconName="trash"
            bgColor="red"
            size={25}
            color="white"
            onPress={() => handleSetTooltip(addressData.id)}
          />
        </Div>
        <Div ml={5}>
          <Button
            text="Edit"
            onPress={() =>
              navigation.navigate(AppRoute.ADDRESS_ADD, {
                userAddress: addressData,
                userData
              })
            }
          />
        </Div>
      </Div>
    </Card>
  );
}
