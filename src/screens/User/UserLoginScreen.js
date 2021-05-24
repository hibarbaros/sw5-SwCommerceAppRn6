import React from 'react';
import {Div} from 'react-native-magnus';

import {Container} from '../../themes/components';
import UserLoginForm from '../../components/UserComponents/UserLoginForm';
import UserForgotPassword from '../../components/UserComponents/UserForgotPassword';
import RegisterButton from '../../components/Common/RegisterButton';

export default function UserLoginScreen() {
  return (
    <Container>
      <UserLoginForm />
      <UserForgotPassword />
      <Div borderTopColor="grey" borderTopWidth={1} h={1} my={20} />
      <RegisterButton />
    </Container>
  );
}
