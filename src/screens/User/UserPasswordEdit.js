import React, {useContext} from 'react';
import {View, Text} from 'react-native';

import UserPasswordEditForm from '../../components/UserComponents/UserPasswordEditForm';
import {useCustomerByCustomerId} from '../../utils/hooks/useCustomer';
import AppContext from '../../context/AppContext';

export default function UserPasswordEdit() {
  const {user} = useContext(AppContext);
  const {data: customerData, isLoading} = useCustomerByCustomerId(user);
  if (isLoading) {
    return (
      <Text marginB-s3 text60>
        Loading
      </Text>
    );
  }

  return (
    <View>
      <UserPasswordEditForm customerData={customerData} />
    </View>
  );
}
