import React from 'react';
import {Button, Icon, Header} from 'react-native-magnus';

export default function ModalHeader({title, onPress}) {
  return (
    <Header
      p={10}
      shadow={false}
      alignment="center"
      prefix={
        <Button bg="transparent" onPress={onPress}>
          <Icon name="arrow-left" fontFamily="Feather" fontSize="2xl" />
        </Button>
      }>
      {title}
    </Header>
  );
}
