import React from 'react';

import {useShopByShopId} from '../../utils/hooks/useApp';

import Paragraph from '../../themes/components/Paragraph';
import Container from '../../themes/components/Container/Container';

export default function AboutShop() {
  const {isLoading, data} = useShopByShopId();

  if (isLoading) {
    return <Paragraph>Loading</Paragraph>;
  }

  return (
    <Container>
      <Paragraph>Shop Name : {data.name}</Paragraph>
      <Paragraph>Web Page : {data.hosts}</Paragraph>
      <Paragraph>Application Version : 1.0</Paragraph>
    </Container>
  );
}
