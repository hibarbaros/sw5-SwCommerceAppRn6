import React, { useState, createRef } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown, Div } from 'react-native-magnus';

import LoadSpinner from 'components/Common/LoadSpinner';
import { Button, Text, Container } from 'themes/components';

import { useAppContext } from 'context/AppContext';

import AppRoute from 'utils/approutes';
import { useCustomerByCustomerId } from 'utils/hooks/useCustomer';
import { useDeleteAddress } from 'utils/hooks/useAddress';

import UserAddressCard from '../UserAddressCard';

export default function UserAddressList({ checkout = false }) {
  const dropdownRef = createRef();
  const navigation = useNavigation();
  const { user } = useAppContext();

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const { data, isLoading } = useCustomerByCustomerId(user);

  const { mutate, isLoading: mutateLoading } = useDeleteAddress();

  function handleDelete() {
    mutate(selectedAddressId);
  }

  function handleSetTooltip(adressId) {
    dropdownRef.current.open();
    setSelectedAddressId(adressId);
  }

  if (isLoading) {
    return (
      <Text marginB-s3 text60>
        Loading
      </Text>
    );
  }

  return (
    <>
      <ScrollView>
        <Container mb={20}>
          <LoadSpinner isVisible={mutateLoading} />
          {data.address.map((item) => {
            return (
              <UserAddressCard
                key={item.id}
                checkout={checkout}
                handleSetTooltip={handleSetTooltip}
                userData={data}
                addressData={item}
              />
            );
          })}
          <Div row justifyContent="center" w="100%">
            <Button
              block
              variant="primary"
              size="small"
              text="Add New Address"
              onPress={() =>
                navigation.navigate(AppRoute.ADDRESS_ADD, {
                  userData: data
                })
              }
            />
          </Div>
        </Container>
      </ScrollView>
      <Dropdown
        ref={dropdownRef}
        mt="md"
        pb="2xl"
        px="xl"
        showSwipeIndicator={true}
        roundedTop="xl"
      >
        <Dropdown.Option bg="red900" onPress={() => handleDelete()} py="lg" my="md" block>
          <Text color="white">Delete</Text>
        </Dropdown.Option>
        <Dropdown.Option
          bg="green900"
          onPress={() => dropdownRef.current.close()}
          py="lg"
          my="md"
          block
        >
          <Text color="white">Cancel</Text>
        </Dropdown.Option>
      </Dropdown>
    </>
  );
}
