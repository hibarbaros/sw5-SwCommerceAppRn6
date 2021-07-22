import React from 'react';
import { Icon } from 'react-native-magnus';

export default function IconComponent() {
  return (
    <Icon
      bg="yellow400"
      p={20}
      rounded="circle"
      name="star"
      color="yellow700"
      fontSize="xl"
      fontFamily="FontAwesome"
    />
  );
}
