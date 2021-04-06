import React, {useState} from 'react';
import {Text} from 'react-native';
import _ from 'lodash';
import HTMLView from 'react-native-htmlview';

import TopNavigationModal from '../../components/Common/TopNavigationModal';
import {ForwardIcon, CloseIcon} from '../../themes/components/IconSet';
import {Styled} from './styles';
import {useShopPagesByShopId} from '../../utils/hooks/useApp';

export default function ServiceHelp() {
  const [modalVisible, setModalVisible] = useState(false);
  const [htmlData, setHtmlData] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);

  const {isLoading, data} = useShopPagesByShopId();

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  var grouped = _.groupBy(data, 'grouping');

  console.log('grouped', grouped);

  return (
    <>
      <Styled.Container>
        <Styled.StyledScrollView>
          {data.map((page) => {
            if (page.html) {
              return (
                <Styled.StyledMenuItem
                  key={page.description}
                  title={page.description}
                  onPress={() => {
                    setModalVisible(true);
                    setHtmlData(page.html);
                    setModalTitle(page.description);
                  }}
                  accessoryRight={ForwardIcon}
                />
              );
            } else {
              return null;
            }
          })}
        </Styled.StyledScrollView>
      </Styled.Container>
      <Styled.StyledModal
        animationType="slide"
        transparent={false}
        visible={modalVisible}>
        <Styled.StyledSafeAreaView>
          <TopNavigationModal
            modalTitle={modalTitle}
            icon={CloseIcon}
            onPress={() => setModalVisible(false)}
          />

          <Styled.StyledScrollView contentInsetAdjustmentBehavior="automatic">
            <Styled.Container>
              <HTMLView value={htmlData} />
            </Styled.Container>
          </Styled.StyledScrollView>
        </Styled.StyledSafeAreaView>
      </Styled.StyledModal>
    </>
  );
}
