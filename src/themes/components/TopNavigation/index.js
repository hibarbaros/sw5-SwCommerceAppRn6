import React from 'react';
import {Button, Header, Icon} from 'react-native-magnus';

export default function TopNavigation({onPress, title, icon}) {
  return (
    <Header
      p={5}
      borderWidth={0}
      shadow={0}
      alignment="left"
      prefix={
        <Button bg="transparent" onPress={onPress}>
          <Icon name={icon} fontFamily="Feather" fontSize="4xl" color="black" />
        </Button>
      }>
      {title}
    </Header>
  );
}
