import React from 'react';
import { Button, Icon } from 'react-native-magnus';

const buttonStyles = {
  primary: {
    bg: 'primary',
    color: 'white',
    fontWeight: 'bold'
  },
  secondary: {
    bg: 'secondary',
    color: 'grey',
    fontWeight: 'bold'
  },
  outline: {
    bg: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    color: 'grey',
    fontWeight: 'bold'
  },
  red: {
    bg: 'red',
    color: 'white'
  },
  icon: {
    bg: 'primary',
    color: 'white'
  },
  block: {
    bg: 'white',
    color: 'primary',
    p: 14,
    my: 5,
    w: '100%',
    borderColor: 'primary',
    borderWidth: 1,
    justifyContent: 'flex-start'
  },
  drawer: {
    bg: 'transparent',
    color: 'grey',
    w: '100%',
    justifyContent: 'space-between',
    pr: 20
  }
};

export default function ThemeButton({
  text,
  variant = 'primary',
  suffix,
  prefix,
  mr,
  ml,
  fontSize,
  iconColor,
  ...rest
}) {
  const buttonStyle = buttonStyles[variant];
  const SuffixIcon = suffix ? (
    <Icon name={suffix} color={iconColor || 'white'} fontSize={18} fontFamily="Feather" />
  ) : null;
  const PrefixIcon = prefix ? (
    <Icon name={prefix} color={iconColor || 'white'} fontSize={18} fontFamily="Feather" />
  ) : null;
  return (
    <Button
      {...rest}
      {...buttonStyle}
      fontSize={fontSize ? fontSize : 18}
      suffix={SuffixIcon}
      prefix={PrefixIcon}
    >
      {text ? text : null}
    </Button>
  );
}
