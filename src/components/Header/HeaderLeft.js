import React from 'react';
import {
  DrawerActions,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import {BackIcon, MenuDrawer} from '../../themes/components/IconSet';
import {colors} from '../../themes/variables';
import {Styled} from './styles';

const HeaderLeft = () => {
  const navigation = useNavigation();
  const index = useNavigationState((state) => state.index);
  return (
    <Styled.IconContainer>
      {index === 0 ? (
        <MenuDrawer
          fill={colors.themeColor}
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        />
      ) : (
        <BackIcon
          fill={colors.themeColor}
          onPress={() => {
            navigation.goBack();
          }}
        />
      )}
    </Styled.IconContainer>
  );
};

export default HeaderLeft;
