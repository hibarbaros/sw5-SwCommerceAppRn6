import React from 'react';
import { Div, Button } from 'react-native-magnus';

export default function GeneralCard({ children, onPress, theme = 'primary', selected = false }) {
  switch (theme) {
    case 'primary':
      return (
        <Button
          column
          bg="transparent"
          onPress={onPress ? onPress : null}
          borderWidth={1}
          borderColor={selected ? 'red' : 'grey'}
          borderRadius={5}
          my={10}
          p={20}
        >
          <Div w="100%">{children}</Div>
        </Button>
      );
    case 'secondary':
      return <Div onPress={onPress}>{children}</Div>;
    case 'border-card':
      return (
        <Div onPress={onPress} borderWidth={1} borderColor="grey" p={10}>
          {children}
        </Div>
      );
    default:
      break;
  }
}
