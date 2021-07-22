import React from 'react';

import { useLocalizationContext } from 'context/Translations';
import { useAppContext } from 'context/AppContext';

import { useCustomerByCustomerId } from 'utils/hooks/useCustomer';
import { Card, Text } from 'themes/components';

export default function UserProfile() {
  const { translations } = useLocalizationContext();
  const { user } = useAppContext();

  const { data, isLoading } = useCustomerByCustomerId(user);

  if (isLoading) {
    return (
      <Text marginB-s3 text60>
        Loading
      </Text>
    );
  }

  return (
    <Card theme="secondary">
      <Text marginB-s3 text60>
        {translations.userProfile}
      </Text>
      <Text>{data.firstname}</Text>
      <Text>{data.lastname}</Text>
      <Text>{data.email}</Text>
      <Text>{data.id}</Text>
    </Card>
  );
}
