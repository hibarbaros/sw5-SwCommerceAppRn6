import React from 'react';

import { useLocalizationContext } from 'context/Translations';
import { useAppContext } from 'context/AppContext';

import { Card, Text } from 'themes/components';

import { useCustomerByCustomerId } from 'utils/hooks/useCustomer';

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
    <Card theme="border-card">
      <Text variant="medium">{translations.userProfile}</Text>
      <Text variant="medium">{data.firstname}</Text>
      <Text variant="medium">{data.lastname}</Text>
      <Text variant="medium">{data.email}</Text>
      <Text variant="medium">{data.id}</Text>
    </Card>
  );
}
