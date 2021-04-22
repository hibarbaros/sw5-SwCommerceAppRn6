import React from 'react';
import {Text} from 'react-native-magnus';

export default function FormErrorLabel({errorMessage}) {
  return (
    <Text color="red" mt={5} fontSize={10}>
      {errorMessage}
    </Text>
  );
}
