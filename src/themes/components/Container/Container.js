import React from 'react';
import {Div} from 'react-native-magnus';

export default function Container({ children, ...rest }) {
  return (
    <Div m={10} {...rest}>
      {children}
    </Div>
  );
}
