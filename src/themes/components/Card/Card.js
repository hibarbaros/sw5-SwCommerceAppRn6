import React from 'react';
import {Card} from 'react-native-ui-lib';

export default function GeneralCard(props) {
  const {children} = props;
  return (
    <Card
      {...props}
      onPress={() => {
        props.onPress();
      }}
      borderRadius={0}
      marginB-s5
      padding-15
      enableShadow={false}>
      {children}
    </Card>
  );
}
