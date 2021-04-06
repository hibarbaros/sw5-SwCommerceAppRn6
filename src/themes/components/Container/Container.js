import React from 'react';
import {View} from 'react-native-ui-lib';

export default function Container(props) {
  const {children} = props;
  return (
    <View marginV-s5 marginH-s5>
      {children}
    </View>
  );
}
