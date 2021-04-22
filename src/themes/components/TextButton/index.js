import React from 'react';
import {Button} from 'react-native-magnus';

export default function TextButton({children, ...rest}) {
  return (
    <Button color="grey" bg="transparent" {...rest}>
      {children}
    </Button>
  );
}
