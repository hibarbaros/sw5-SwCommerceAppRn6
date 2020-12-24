import React from 'react';
import {View} from 'react-native-ui-lib';
import {Button} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

import {Container} from '../../themes/components';
import UserLoginForm from '../../components//UserComponents/UserLoginForm/UserLoginForm';

import AppRoute from '../../utils/approutes';

const UserLoginScreen = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <UserLoginForm />
      <View margin-s5>
        <Button onPress={() => navigation.navigate(AppRoute.REGISTER)}>
          Register
        </Button>
      </View>
    </Container>
  );
};

export default UserLoginScreen;
