import React from 'react';
import { DrawerActions, useNavigation, useNavigationState } from '@react-navigation/native';

import { IconButton } from 'themes/components';

import { Styled } from './styles';

const HeaderLeft = () => {
  const navigation = useNavigation();
  const index = useNavigationState((state) => state.index);
  return (
    <Styled.IconContainer>
      {index === 0 ? (
        <IconButton
          iconName="bars"
          color="black"
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        />
      ) : (
        <IconButton
          iconName="arrow-left"
          color="black"
          onPress={() => {
            navigation.goBack();
          }}
        />
      )}
    </Styled.IconContainer>
  );
};

export default HeaderLeft;
