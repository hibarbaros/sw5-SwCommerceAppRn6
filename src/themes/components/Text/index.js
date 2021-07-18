import React from 'react';
import {Text} from 'react-native-magnus';

const textStyles = {
  primary: {
    fontSize: 12,
    my: 2,
  },
  secondary: {
    fontSize: 'lg',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'red',
    letterSpacing: 2,
    mt: 'lg',
  },
};

export default function ThemeText({children, variant = 'primary', ...rest}) {
  const textStyle = textStyles[variant];
  return (
    <Text {...rest} {...textStyle}>
      {children}
    </Text>
  );
}
