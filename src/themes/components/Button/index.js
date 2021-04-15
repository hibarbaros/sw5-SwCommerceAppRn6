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
          bg="blue600"
          p={12}
          color="white"
          suffix={<Icon name={suffix} color="white" fontFamily="Feather" />}
          prefix={<Icon name={prefix} color="white" fontFamily="Feather" />}
          mt="lg">
          <Text color="white" mr={suffix && 'auto'} ml={prefix && 'auto'}>
            {text}
          </Text>
        </Button>
      );
    case 'secondary':
      return (
        <Button
          {...rest}
          bg="blue900"
          p={12}
          color="white"
          suffix={<Icon name={suffix} color="white" fontFamily="Feather" />}
          prefix={<Icon name={prefix} color="white" fontFamily="Feather" />}
          mt="lg">
          {text}
        </Button>
      );
    case 'dropDownButton':
      return (
        <Button
          {...rest}
          bg="blue600"
          p={12}
          color="white"
          suffix={<Icon name={suffix} color="white" fontFamily="Feather" />}
          prefix={<Icon name={prefix} color="white" fontFamily="Feather" />}
          mt="lg">
          {text}
        </Button>
      );
    default:
      return null;
  }
}
