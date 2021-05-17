import React from 'react';
import {Text} from 'react-native-magnus';

export default function ThemeText({
  onPress,
  children,
  variant = 'primary',
  disabled,
  suffix,
  prefix,
  ...rest
}) {
  switch (variant) {
    case 'primary':
      return (
        <Text {...rest} fontSize={12} my={2}>
          {children}
        </Text>
      );
    case 'secondary':
      return (
        <Text
          {...rest}
          fontSize="lg"
          fontWeight="bold"
          textTransform="uppercase"
          color="red100"
          letterSpacing={2}
          mt="lg">
          {children}
        </Text>
      );
    default:
      return null;
  }
}
