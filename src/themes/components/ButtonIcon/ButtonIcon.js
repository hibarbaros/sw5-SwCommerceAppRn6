import React from 'react';
import {Icon} from '@ui-kitten/components';
import {Styled} from './styles';

export default function ButtonIcon({
  onPress,
  iconName,
  iconColor,
  iconSize,
  bordered = true,
}) {
  return (
    <Styled.ButtonContainer onPress={onPress} bordered={bordered}>
      <Icon
        name={iconName}
        fill={iconColor}
        size={iconSize}
        bordered={bordered}
        onPress={onPress}
      />
    </Styled.ButtonContainer>
  );
}
