import React, {useContext} from 'react';
import {Card, Text} from 'react-native-ui-lib';

import {LocalizationContext} from '../../../context/Translations';
import AppContext from '../../../context/AppContext';

import {useCustomerByCustomerId} from '../../../utils/hooks/useCustomer';

export default function UserProfile() {
  const {translations} = useContext(LocalizationContext);
  const {user} = useContext(AppContext);

  const {data, isLoading} = useCustomerByCustomerId(user);

  if (isLoading) {
    return (
      <Text marginB-s3 text60>
        Loading
      </Text>
    );
  }

  return (
    <Card borderRadius={0} marginB-s5 padding-15 enableShadow={false}>
      <Text marginB-s3 text60>
        {translations.userProfile}
      </Text>
      <Text>{data.firstname}</Text>
      <Text>{data.lastname}</Text>
      <Text>{data.email}</Text>
    </Card>
  );
}
