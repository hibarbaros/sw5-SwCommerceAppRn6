import React from 'react';
import {Div, Button} from 'react-native-magnus';

export default function GeneralCard({
  children,
  onPress,
  theme = 'primary',
  rest,
  selected = false,
}) {
  switch (theme) {
    case 'primary':
      return (
        <Button
          {...rest}
          column
          bg="transparent"
          onPress={onPress ? onPress : null}
          borderWidth={1}
          borderColor={selected ? 'red' : 'grey'}
          borderRadius={5}
          my={10}
          p={20}>
          <Div w="100%">{children}</Div>
        </Button>
      );
    case 'secondary':
      return (
        <Div {...rest} onPress={onPress}>
          {children}
        </Div>
      );
    default:
      break;
  }
}
