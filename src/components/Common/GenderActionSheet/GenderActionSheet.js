import React, {createRef, useState} from 'react';
import {ListItem} from '@ui-kitten/components';
import ActionSheet from 'react-native-actions-sheet';
import * as Icon from 'react-native-feather';

import {colors} from '../../../themes/variables';
import {Styled} from './styles';

const ArrowIcon = (props) => (
  <Icon.ArrowDown stroke={colors.white} {...props} />
);

export default function GenderActionSheet({onPress}) {
  const actionSheetRef = createRef();

  const [buttonValue, setButtonValue] = useState('Gender Select');

  function handleItem(option) {
    onPress(option);
    setButtonValue(option);
    actionSheetRef.current.setModalVisible(false);
  }

  return (
    <>
      <Styled.ButtonContainer>
        <Styled.StyledButton
          buttonType="dropDownButton"
          text={buttonValue}
          size="medium"
          accessoryRight={ArrowIcon}
          onPress={() => {
            actionSheetRef.current.setModalVisible();
          }}>
          {buttonValue}
        </Styled.StyledButton>
      </Styled.ButtonContainer>

      <ActionSheet ref={actionSheetRef}>
        <Styled.ActionSheetContainer>
          <ListItem onPress={() => handleItem('mr')} title="Mr." />
          <ListItem onPress={() => handleItem('mrs')} title="Mrs." />
        </Styled.ActionSheetContainer>
      </ActionSheet>
    </>
  );
}
