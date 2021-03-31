import React from 'react';
import {Text} from 'react-native';

import {usePropertyGroupDetail} from '../../../utils/hooks/useProduct';
import {Styled} from './styles';

export default function ProductPropertyGroup({product}) {
  const {isLoading, error, data: propertyGroup} = usePropertyGroupDetail(
    product.propertyGroup.id,
  );

  if (isLoading) {
    return <Text>...Loading</Text>;
  }

  if (error) {
    return <Text>An error has occurred: {error.message} </Text>;
  }

  return (
    <>
      {propertyGroup.options.map((prop, index) => (
        <Styled.CategoryContainer key={index}>
          <Styled.DescriptionTitle>
            {'.'}
            {prop.name}
          </Styled.DescriptionTitle>
          {product.propertyValues.map((value) => {
            return (
              prop.id === value.optionId && (
                <Styled.GeneralText marginB-5 marginT-15 key={value.value}>
                  {value.value}
                </Styled.GeneralText>
              )
            );
          })}
        </Styled.CategoryContainer>
      ))}
    </>
  );
}
