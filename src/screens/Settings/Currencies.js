import React, {useContext} from 'react';
import {Text, Radio, Div} from 'react-native-magnus';

import AppContext from '../../context/AppContext';

export default function Currencies() {
  const {allCurrencies, currency, setCurrency} = useContext(AppContext);
  return (
    <Radio.Group row onChange={(item) => setCurrency(item)}>
      {allCurrencies.map((item) => (
        <Radio value={item} key={item.id}>
          {({}) => (
            <Div
              bg={item.id === currency.id ? 'blue600' : 'blue100'}
              px="xl"
              py="md"
              mr="md"
              rounded="circle">
              <Text color={item.id === currency.id ? 'white' : 'gray800'}>
                {item.name}
              </Text>
            </Div>
          )}
        </Radio>
      ))}
    </Radio.Group>
  );
}
