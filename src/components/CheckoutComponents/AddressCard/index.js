import React from 'react';
import {Div} from 'react-native-magnus';

import {useAddress} from '../../../utils/hooks/useAddress';
import {Card, Headline, Text} from '../../../themes/components';

export default function Address({addressId, onPress}) {
  const {isLoading, data} = useAddress(addressId);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <Card onPress={onPress}>
      <Headline mb={10} variant="h3" bold>
        {data.firstname} {data.lastname}
      </Headline>
      <Div row>
        <Div mr={10}>
          <Text bold>Street</Text>
          <Text>City</Text>
          <Text>Zipcode</Text>
          {data.country && <Text>Country</Text>}
        </Div>
        <Div>
          <Text>: {data.street}</Text>
          <Text>: {data.city}</Text>
          <Text>: {data.zipcode}</Text>
          {data.country && <Text>: {data.country.name}</Text>}
        </Div>
      </Div>
    </Card>
  );
}
