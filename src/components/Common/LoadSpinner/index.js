import React from 'react';
import {Modal} from 'react-native';
import {Image, Div} from 'react-native-magnus';

import Logo from 'assets/images/lemken-logo.png';

export default function LoadSpinner({isVisible}) {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <Div
        bg="rgba(255,255,255,0.8)"
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center">
        <Image h={40} w={160} source={Logo} />
      </Div>
    </Modal>
  );
}
