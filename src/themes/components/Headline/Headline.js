import React from 'react';
import {Text} from 'react-native-magnus';
import {sanFranciscoWeights} from 'react-native-typography';

import {fontFamilies} from '../../theme';

const Headline = ({children, variant = 'h1', ...rest}) => {
  switch (variant) {
    case 'h1':
      return (
        <Text
          {...rest}
          color="primary"
          fontSize={20}
          style={sanFranciscoWeights.bold}>
          {children}
        </Text>
      );
    case 'h2':
      return (
        <Text
          {...rest}
          color="primary"
          fontSize={16}
          fontFamily={fontFamilies.primaryRegular}>
          {children}
        </Text>
      );
    case 'h5':
      return (
        <Text
          {...rest}
          color="dark"
          fontSize={22}
          style={sanFranciscoWeights.light}>
          {children}
        </Text>
      );
    case 'primarytext':
      return (
        <Text
          {...rest}
          style={
            rest.bold ? sanFranciscoWeights.bold : sanFranciscoWeights.light
          }>
          {children}
        </Text>
      );
    case 'secondarytext':
      return (
        <Text {...rest} fontFamily={fontFamilies.secondary}>
          {children}
        </Text>
      );
    default:
      return null;
  }
};

export default Headline;
