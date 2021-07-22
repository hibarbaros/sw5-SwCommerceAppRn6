import React from 'react';
import { Icon, Button } from 'react-native-magnus';

export default function ButtonIcon({ onPress, iconName, color, bgColor, size }) {
  return (
    <Button onPress={onPress} p={10} bg={bgColor ? bgColor : 'transparent'}>
      <Icon
        name={iconName}
        fontFamily="FontAwesome"
        color={color ? color : 'primary'}
        fontSize={20}
        w={size ? size : 20}
        h={size ? size : 20}
      />
    </Button>
  );
}
