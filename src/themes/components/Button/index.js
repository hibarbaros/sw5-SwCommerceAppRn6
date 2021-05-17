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
  fontSize,
  py,
  ...rest
}) {
  switch (variant) {
    case 'primary':
      return (
        <Button
          {...rest}
          bg="primary"
          px={24}
          py={16}
          suffix={
            <Icon
              name={suffix}
              color="white"
              fontSize={fontSize ? fontSize : 18}
              fontFamily="Feather"
            />
          }
          prefix={
            <Icon
              name={prefix}
              fontSize={fontSize ? fontSize : 18}
              color="white"
              fontFamily="Feather"
            />
          }>
          <Text
            color="white"
            mr={mr}
            ml={ml}
            fontSize={fontSize ? fontSize : 18}
            fontWeight="bold">
            {text}
          </Text>
        </Button>
      );
    case 'secondary':
      return (
        <Button
          {...rest}
          bg="secondary"
          px={24}
          py={16}
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
          <Text color="white" mr={mr} ml={ml} fontSize={18} fontWeight="bold">
            {text}
          </Text>
        </Button>
      );
    case 'outline':
      return (
        <Button
          {...rest}
          bg="white"
          borderColor="grey"
          borderWidth={1}
          px={24}
          py={16}
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
          <Text color="grey" mr={mr} ml={ml} fontSize={18} fontWeight="bold">
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
    case 'block':
      return (
        <Button
          {...rest}
          bg="white"
          p={14}
          my={5}
          w="100%"
          color="primary"
          borderColor="primary"
          borderWidth={1}
          justifyContent="flex-start"
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
    default:
      return null;
  }
}
