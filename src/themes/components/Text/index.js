import React, { memo } from 'react';
import { Text } from 'react-native-magnus';

const textStyles = {
  primary: {
    fontSize: 12,
    my: 2
  },
  secondary: {
    fontSize: 'lg',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'red',
    letterSpacing: 2,
    mt: 'lg'
  },
  largeTitle: {
    fontSize: 'lg',
    fontWeight: 'bold',
    color: 'red',
    my: 10
  },
  medium: {
    fontSize: 16,
    my: 5
  },
  large: {
    fontSize: 22,
    my: 5
  }
};

const ThemeText = ({ children, variant = 'primary', ...rest }) => {
  const textStyle = textStyles[variant];
  return (
    <Text {...rest} {...textStyle}>
      {children}
    </Text>
  );
};

export default memo(ThemeText);
