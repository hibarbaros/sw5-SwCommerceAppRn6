import React from 'react';

import {Styled} from './styles';
import {sizes} from '../../variables';

export default function Button({
  onPress,
  text,
  buttonType = 'primary',
  size = 'tiny',
  rightAccesories,
  disabled,
}) {
  switch (buttonType) {
    case 'primary':
      return (
        <Styled.PrimaryContainer
          disabled={disabled}
          size={sizes[size]}
          onPress={onPress}>
          <Styled.PrimaryText>{text}</Styled.PrimaryText>
          {rightAccesories && (
            <Styled.RightAccessoriesContainer>
              {rightAccesories}
            </Styled.RightAccessoriesContainer>
          )}
        </Styled.PrimaryContainer>
      );
    case 'secondary':
      return (
        <Styled.SecondaryContainer
          disabled={disabled}
          size={sizes[size]}
          onPress={onPress}>
          <Styled.SecondaryText>{text}</Styled.SecondaryText>
        </Styled.SecondaryContainer>
      );
    case 'dropDownButton':
      return (
        <Styled.FormInputContainer
          disabled={disabled}
          size={sizes[size]}
          onPress={onPress}>
          <Styled.FormInputText>{text}</Styled.FormInputText>
          {rightAccesories && (
            <Styled.RightAccessoriesContainer>
              {rightAccesories}
            </Styled.RightAccessoriesContainer>
          )}
        </Styled.FormInputContainer>
      );
    default:
      return null;
  }
}
