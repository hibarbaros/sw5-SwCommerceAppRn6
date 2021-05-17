import React, {useContext, useState} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import {Modal, Div} from 'react-native-magnus';

import {useCustomerByCustomerId} from '../../../utils/hooks/useCustomer';

import AppContext from '../../../context/AppContext';
import CheckoutContext from '../../../context/CheckoutContext';
import {Container, Button, ModalHeader} from '../../../themes/components';
import AddressCard from '../AddressCard';

export default function Address() {
  const {user} = useContext(AppContext);

  const {
    selectedBilllingAddress,
    setselectedBilllingAddress,
    selectedShippingAddress,
    setselectedShippingAddress,
    setselectedShippingMethod,
  } = useContext(CheckoutContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [isBillingAddress, setIsBillingAddress] = useState(null);

  const {data, isLoading} = useCustomerByCustomerId(user, {
    onSuccess: (res) => {
      setselectedBilllingAddress(res.defaultBillingAddress);
      setselectedShippingAddress(res.defaultShippingAddress);
    },
  });

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  const handleCard = (address) => {
    setModalVisible(false);
    isBillingAddress
      ? setselectedBilllingAddress(address)
      : setselectedShippingAddress(address);
  };

  return (
    <>
      {selectedBilllingAddress && (
        <AddressCard addressId={selectedBilllingAddress.id} />
      )}
      <Div mb={20}>
        <Button
          block
          onPress={() => {
            setModalVisible(true);
            setIsBillingAddress(true);
          }}
          text="Change Billing Address"
        />
      </Div>
      <Div>
        {selectedShippingAddress && (
          <AddressCard addressId={selectedShippingAddress.id} />
        )}
      </Div>
      <Div>
        <Button
          block
          onPress={() => {
            setModalVisible(true);
            setIsBillingAddress(false);
          }}
          text="Change Shipping Address"
        />
      </Div>
      <SafeAreaView>
        <Modal animationType="slide" visible={modalVisible}>
          <SafeAreaView>
            <ModalHeader
              title="Address"
              onPress={() => setModalVisible(false)}
            />
            <ScrollView>
              <Container>
                {data.address.map((address, i) => {
                  return (
                    <AddressCard
                      key={i}
                      addressId={address.id}
                      setModalVisible={setModalVisible}
                      onPress={() => handleCard(address)}
                    />
                  );
                })}
              </Container>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </>
  );
}
