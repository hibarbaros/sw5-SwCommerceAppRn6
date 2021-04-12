import React from 'react';
import {View} from 'react-native-ui-lib';

import {Container} from '../../themes/components';
import UserLoginForm from '../../components/UserComponents/UserLoginForm';
import RegisterButton from '../../components/Common/RegisterButton';

export default function UserLoginScreen() {
  return (
    <Container>
      <UserLoginForm />
      <View margin-s5>
        <RegisterButton />
      </View>
    </Container>
  );
}
