import React from 'react';
import { Div } from 'react-native-magnus';

import { usePropertyGroupDetail } from 'utils/hooks/useProduct';
import { Text } from 'themes/components';

export default function ProductPropertyGroup({ groupId, propertyValues }) {
  const { isLoading, data } = usePropertyGroupDetail(groupId);

  if (isLoading) {
    return <Text>...Loading</Text>;
  }
  return (
    <>
      {data.options.map((prop, index) => (
        <Div key={index} mb={20}>
          <Text mb={5}>
            {'.'}
            {prop.name}
          </Text>
          {propertyValues.map((value) => {
            return (
              prop.id === value.optionId && (
                <Text marginB-5 marginT-15 key={value.value}>
                  {value.value}
                </Text>
              )
            );
          })}
        </Div>
      ))}
    </>
  );
}
