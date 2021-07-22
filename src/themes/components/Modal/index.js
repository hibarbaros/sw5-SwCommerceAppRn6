import React from 'react';
import { SafeAreaView } from 'react-native';
import { Icon, Modal, Div } from 'react-native-magnus';

import { Button } from 'themes/components';

export default function ModalComponent({ children, visible, setVisible }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal isVisible={visible}>
        <Div alignItems="center" w="100%" flex={1} minH={60}>
          <Button
            variant="icon"
            position="absolute"
            right={10}
            top={10}
            suffix="x"
            onPress={() => {
              setVisible(false);
            }}
          />
        </Div>
        {children}
      </Modal>
    </SafeAreaView>
  );
}
