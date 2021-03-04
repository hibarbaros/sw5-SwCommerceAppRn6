import React from 'react';
import {View, Text} from 'react-native';
import _ from 'lodash';

import {useAttributesOptions} from '../../../utils/hooks/useProduct';

import CheckItem from './CheckItem';
import {Styled} from './styles';

export default function ProductAttributes({products}) {
  const {data, isLoading} = useAttributesOptions();
  const filterList = _.map(products, 'filters');
  const flatted = _.flatten(filterList);
  const uniqueFilterList = _.uniqBy(flatted, 'valueID');

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <View>
      {data.map((element) => {
        return (
          <React.Fragment key={element.id}>
            <Styled.AttibuteTitle>{element.name}</Styled.AttibuteTitle>
            {element.options.map((option) => {
              const finded = _.find(uniqueFilterList, {
                valueID: option.id,
              });
              if (finded) {
                return (
                  <CheckItem
                    products={products}
                    key={option.id}
                    option={finded}
                  />
                );
              } else {
                return null;
              }
            })}
          </React.Fragment>
        );
      })}
    </View>
  );
}
