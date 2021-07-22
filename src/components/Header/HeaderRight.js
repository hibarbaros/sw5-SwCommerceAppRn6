import React from 'react';
import { useNavigation } from '@react-navigation/native';

import AppRoutes from 'utils/approutes';

import { IconButton } from 'themes/components';
import { Styled } from './styles';

export default function HeaderRight() {
  const navigation = useNavigation();
  return (
    <Styled.RightHeaderContainer>
      <IconButton
        color="black"
        iconName="bell"
        onPress={() => {
          navigation.navigate(AppRoutes.LOCAL_NOTIFICATION);
        }}
      />
    </Styled.RightHeaderContainer>
  );
}
