import React from 'react';
import {Button, Icon, Text} from 'react-native-magnus';

export default function ThemeButton({
  text,
  variant = 'primary',
  disabled,
  suffix,
  prefix,
  mr,
  ml,
  ...rest
}) {
  switch (variant) {
    case 'primary':
      return (
        <Button
          {...rest}
          bg="primary"
          p={12}
          suffix={
            <Icon
              name={suffix}
              color="white"
              fontSize={18}
              fontFamily="Feather"
            />
          }
          prefix={
            <Icon
              name={prefix}
              fontSize={18}
              color="white"
              fontFamily="Feather"
            />
          }>
          <Text color="white" mr={mr} ml={ml} fontSize={18}>
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
          suffix={
            <Icon
              name={suffix}
              color="white"
              fontSize={18}
              fontFamily="Feather"
            />
          }
          prefix={
            <Icon
              name={prefix}
              color="white"
              fontSize={18}
              fontFamily="Feather"
            />
          }>
          <Text color="white" mr={mr} ml={ml} fontSize={16}>
            {text}
          </Text>
        </Button>
      );
    case 'red':
      return (
        <Button
          {...rest}
          bg="red"
          p={12}
          color="white"
          suffix={
            <Icon
              name={suffix}
              color="white"
              fontSize={18}
              fontFamily="Feather"
            />
          }
          prefix={
            <Icon
              name={prefix}
              color="white"
              fontSize={18}
              fontFamily="Feather"
            />
          }>
          {text}
        </Button>
      );
    case 'icon':
      return (
        <Button
          {...rest}
          ml={ml}
          mr={mr}
          bg="primary"
          p={8}
          color="white"
          suffix={
            <Icon
              name={suffix}
              color="white"
              fontSize={18}
              fontFamily="Feather"
            />
          }
          prefix={
            <Icon
              name={prefix}
              color="white"
              fontSize={18}
              fontFamily="Feather"
            />
          }
        />
      );
    default:
      return null;
  }
}
