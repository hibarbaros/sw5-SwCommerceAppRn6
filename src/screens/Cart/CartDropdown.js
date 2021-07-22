import React, { useState } from 'react';
import { Modal, Div, Header } from 'react-native-magnus';
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';

import UserLoginForm from 'components/UserComponents/UserLoginForm';
import UserRegisterForm from 'components/UserComponents/UserRegisterForm';
import { Button } from 'themes/components';

export default function CartDropdown({ modalVisible, setModalVisible }) {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <Modal isVisible={modalVisible}>
      <StickyHeaderFooterScrollView
        makeScrollable={true}
        fitToScreen={true}
        renderStickyHeader={() => (
          <Header
            p="lg"
            alignment="center"
            shadow={false}
            prefix={
              <Button
                variant="icon"
                backgroundColor="transparent"
                rounded="circle"
                prefix="arrow-left"
                onPress={() => {
                  setModalVisible(false);
                }}
              />
            }
          >
            Register or Login Form
          </Header>
        )}
        renderStickyFooter={() => (
          <Div row p={10} backgroundColor="white">
            <Div w="50%" pr={10}>
              <Button
                text="Register Form"
                variant={isRegister ? 'secondary' : 'primary'}
                block
                onPress={() => setIsRegister(true)}
              />
            </Div>
            <Div w="50%" pl={10}>
              <Button
                text="Login Form"
                variant={!isRegister ? 'secondary' : 'primary'}
                block
                onPress={() => setIsRegister(false)}
              />
            </Div>
          </Div>
        )}
      >
        <Div px={10}>
          {isRegister ? (
            <UserRegisterForm modalVisible={() => setModalVisible(false)} />
          ) : (
            <UserLoginForm modalVisible={() => setModalVisible(false)} />
          )}
        </Div>
      </StickyHeaderFooterScrollView>
    </Modal>
  );
}
