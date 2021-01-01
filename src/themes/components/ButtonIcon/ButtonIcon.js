import React from 'react';
import {Styled} from './styles';

export default function ButtonIcon({
  onPress,
  iconName,
  iconColor,
  iconSize,
  bordered = true,
}) {
  const Icon = (props) => <Styled.ButtonIcon {...props} name={iconName} />;

  return (
    <Styled.StyledButton
      onPress={onPress}
      bordered={bordered}
      accessoryLeft={Icon}
    />
  );
}
