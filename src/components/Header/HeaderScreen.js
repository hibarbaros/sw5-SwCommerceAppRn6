import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {colors} from 'themes/variables';
import {BackIcon} from 'themes/components/IconSet';

const HeaderLeft = () => {
  //NOTE: Ekranlarin header'lari
  const navigation = useNavigation();

  return (
    <BackIcon
      fill={colors.themeColor}
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
};

export default HeaderLeft;
