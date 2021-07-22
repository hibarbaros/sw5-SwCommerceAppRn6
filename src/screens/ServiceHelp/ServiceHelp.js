import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import HTMLView from 'react-native-htmlview';
import _ from 'lodash';

import { Button, Modal, Text, Container } from 'themes/components';
import { useShopPagesByShopId } from 'utils/hooks/useApp';

export default function ServiceHelp() {
  const [modalVisible, setModalVisible] = useState(false);
  const [htmlData, setHtmlData] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);

  const { isLoading, data } = useShopPagesByShopId();

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <>
      <ScrollView>
        <Container>
          {data.map((page, index) =>
            page.html ? (
              <Button
                key={index}
                variant="outline"
                w="100%"
                mb={10}
                text={page.description}
                onPress={() => {
                  setModalVisible(true);
                  setHtmlData(page.html);
                  setModalTitle(page.description);
                }}
              />
            ) : null
          )}
        </Container>
      </ScrollView>
      <Modal visible={modalVisible} setVisible={setModalVisible}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Container>
            <Text variant="large">{modalTitle}</Text>
            <HTMLView value={htmlData} />
          </Container>
        </ScrollView>
      </Modal>
    </>
  );
}
