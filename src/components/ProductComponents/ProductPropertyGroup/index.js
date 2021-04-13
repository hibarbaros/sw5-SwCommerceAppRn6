import React from 'react';
import {Text} from 'react-native';

import {usePropertyGroupDetail} from '../../../utils/hooks/useProduct';
import {Styled} from './styles';

export default function ProductPropertyGroup({groupId, propertyValues}) {
  const {isLoading, data} = usePropertyGroupDetail(groupId);

  if (isLoading) {
    return <Text>...Loading</Text>;
  }
  return (
    <>
      {data.options.map((prop, index) => (
        <Styled.CategoryContainer key={index}>
          <Styled.DescriptionTitle>
            {'.'}
            {prop.name}
          </Styled.DescriptionTitle>
          {propertyValues.map((value) => {
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
