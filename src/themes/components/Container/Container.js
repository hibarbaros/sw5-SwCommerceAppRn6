import React from 'react';
import {Div} from 'react-native-magnus';

export default function Container(props) {
  const {children} = props;
  return <Div m={10}>{children}</Div>;
}
