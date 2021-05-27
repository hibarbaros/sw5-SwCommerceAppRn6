import React from 'react';
import {Text} from 'react-native-magnus';
import {sanFranciscoWeights} from 'react-native-typography';

export default function Paragraph({children, rest, fontSize, bold}) {
  return (
    <Text
      {...rest}
      color="dark"
      fontSize={fontSize ? fontSize : 12}
      style={bold ? sanFranciscoWeights.bold : sanFranciscoWeights.regular}>
      {children}
    </Text>
  );
}
