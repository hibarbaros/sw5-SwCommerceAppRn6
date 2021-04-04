import React, {useState, createRef} from 'react';
import styled from 'styled-components';
import {View, Text} from 'react-native-ui-lib';
import {Button} from '@ui-kitten/components';
import {CheckmarkIcon} from '../../../themes/components/IconSet';
import ActionSheet from 'react-native-actions-sheet';

export default function SheetItem({set, productVariants, handleSetVariant}) {
  const actionSheetRef = createRef();
  const [selected, setSelected] = useState(null);

  return (
    <React.Fragment key={set.name}>
      <View marginB-s5>
        <Button
          onPress={() => {
            actionSheetRef.current.setModalVisible();
          }}>
          <Text>
            {set.name} {selected && `- ${selected.name}`}
          </Text>
        </Button>
      </View>

      <ActionSheet ref={actionSheetRef}>
        <View padding-s5>
          <Text marginB-s5 text70BL>
            {set.name}
          </Text>
          {productVariants.map((variant) => {
            if (variant.groupId === set.id) {
              return (
                <View marginB-s5 key={variant.name}>
                  <Item
                    onPress={() => {
                      handleSetVariant(variant, set);
                      setSelected(variant);
                      actionSheetRef.current.setModalVisible();
                    }}>
                    <Text>{variant.name}</Text>
                    {selected && variant.id === selected.id && (
                      <CheckmarkIcon fill="#8F9BB3" name="checkmark-outline" />
                    )}
                  </Item>
                </View>
              );
            } else {
              return null;
            }
          })}
        </View>
      </ActionSheet>
    </React.Fragment>
  );
}

const Item = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-color: #ccc;
  flex-direction: row;
  padding-bottom: 5px;
  width: 80%;
`;
