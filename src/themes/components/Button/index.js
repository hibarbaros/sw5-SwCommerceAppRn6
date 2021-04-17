import React from 'react';
import {Button, Icon, Text} from 'react-native-magnus';

export default function ThemeButton({
  text,
  variant = 'primary',
  disabled,
  suffix,
  prefix,
  ...rest
}) {
  switch (variant) {
    case 'primary':
      return (
        <Button
          {...rest}
          bg="primary"
          p={12}
          suffix={<Icon name={suffix} color="white" fontFamily="Feather" />}
          prefix={<Icon name={prefix} color="white" fontFamily="Feather" />}>
          <Text color="white" mr={suffix && 'auto'} ml={prefix && 'auto'}>
            {text}
          </Text>
        </Button>
      );
    case 'secondary':
      return (
        <Button
          {...rest}
          bg="secondary"
          p={12}
          color="white"
          suffix={<Icon name={suffix} color="white" fontFamily="Feather" />}
          prefix={<Icon name={prefix} color="white" fontFamily="Feather" />}>
          {text}
        </Button>
      );
    case 'red':
      return (
        <Button
          {...rest}
          bg="red"
          p={12}
          color="white"
          suffix={<Icon name={suffix} color="white" fontFamily="Feather" />}
          prefix={<Icon name={prefix} color="white" fontFamily="Feather" />}>
          {text}
        </Button>
      );
    default:
      return null;
  }
}
