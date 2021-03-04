import React from 'react';
import {ScrollView} from 'react-native';
import {Container} from '../../themes/components';
import UserAddressList from '../../components/UserComponents/UserAddressList';

export default function UserAddresses() {
  return (
    <ScrollView>
      <Container>
        <UserAddressList />
      </Container>
    </ScrollView>
  );
}
