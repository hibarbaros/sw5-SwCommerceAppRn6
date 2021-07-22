import React from 'react';

import UserOrderList from 'components/UserComponents/UserOrderList';
import SmartScrollVIew from 'components/Common/SmartScrollVIew';
import { Container } from 'themes/components';

export default function UserOrdersScreen() {
  return (
    <SmartScrollVIew>
      <Container>
        <UserOrderList />
      </Container>
    </SmartScrollVIew>
  );
}
