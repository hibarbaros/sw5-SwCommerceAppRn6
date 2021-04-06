import React, {useState} from 'react';
import {Toast} from 'react-native-ui-lib';

export function handleVisible() {
  console.log('GlobalToast -> handleVisible');
}

export default function GlobalToast() {
  const [visible, setVisible] = useState(false);

  return (
    <Toast
      visible={visible}
      position="top"
      backgroundColor="white"
      message="test"
      autoDismiss={1000}
      onDismiss={() => setVisible(false)}
      action={{
        label: 'Close',
        onPress: () => setVisible(false),
      }}
    />
  );
}
