import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Modal, Div, Button, Icon} from 'react-native-magnus';

import UserLoginForm from '../../components/UserComponents/UserLoginForm';
import UserRegisterForm from '../../components/UserComponents/UserRegisterForm';

export default function CartDropdown({modalVisible, setModalVisible}) {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <Modal isVisible={modalVisible}>
      <SafeAreaView>
        <Div row>
          <Button onPress={() => setIsRegister(true)}>Register</Button>
          <Button onPress={() => setIsRegister(false)}>Login</Button>
          <Button
            bg="gray400"
            h={35}
            w={35}
            position="absolute"
            right={15}
            rounded="circle"
            onPress={() => {
              setModalVisible(false);
            }}>
            <Icon color="gray400" name="close" />
          </Button>
        </Div>

        <Div
          bg="gray100"
          color="blue600"
          justifyContent="center"
          width="100%"
          mb={50}>
          {isRegister ? (
            <UserRegisterForm modalVisible={() => setModalVisible(false)} />
          ) : (
            <UserLoginForm modalVisible={() => setModalVisible(false)} />
          )}
        </Div>
      </SafeAreaView>
    </Modal>
  );
}
