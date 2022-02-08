import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { Modal, Div } from 'react-native-magnus';

import { useCustomerByCustomerId } from 'utils/hooks/useCustomer';
import { useCountries } from 'utils/hooks/useApp';

import { useAppContext } from 'context/AppContext';
import { useCheckoutContext } from 'context/CheckoutContext';
import { Container, Button, ModalHeader } from 'themes/components';
import AddressCard from '../AddressCard';

export default function Address() {
  const { user } = useAppContext();

  const {
    selectedBilllingAddress,
    setselectedBilllingAddress,
    selectedShippingAddress,
    setselectedShippingAddress
  } = useCheckoutContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [isBillingAddress, setIsBillingAddress] = useState(null);

  const { data, isLoading } = useCustomerByCustomerId(user);
  const { data: countries } = useCountries();

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  const addCountryToAddress = (address) => {
    const found = countries.find((x) => x.id === parseFloat(address.country_id));
    setselectedBilllingAddress(found);
    address.country = found;
    return address;
  };

  const handleBilling = (address) => {
    setModalVisible(false);
    const response = addCountryToAddress(address);
    setselectedBilllingAddress(response);
  };

  const handleShipping = (address) => {
    setModalVisible(false);
    const response = addCountryToAddress(address);
    setselectedShippingAddress(response);
  };

  return (
    <>
      {selectedBilllingAddress && <AddressCard addressId={selectedBilllingAddress.id} />}
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
      <Div>{selectedShippingAddress && <AddressCard addressId={selectedShippingAddress.id} />}</Div>
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
            <ModalHeader title="Address" onPress={() => setModalVisible(false)} />
            <ScrollView>
              <Container>
                {data.address.map((address, i) => {
                  return (
                    <AddressCard
                      key={i}
                      addressId={address.id}
                      setModalVisible={setModalVisible}
                      onPress={() =>
                        isBillingAddress ? handleBilling(address) : handleShipping(address)
                      }
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
