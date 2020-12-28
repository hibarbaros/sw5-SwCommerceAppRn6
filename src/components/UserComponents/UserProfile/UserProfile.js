import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@ui-kitten/components';
import {Card, View, Text} from 'react-native-ui-lib';

import {LocalizationContext} from '../../../context/Translations';
import AppContext from '../../../context/AppContext';
import {EditIcon} from '../../../themes/components/IconSet';
import AppRoute from '../../../utils/approutes';
import {useCustomerByCustomerId} from '../../../utils/hooks/useCustomer';

export default function UserProfile() {
  const navigation = useNavigation();
  const {translations} = useContext(LocalizationContext);
  const {user} = useContext(AppContext);

  const {data: customerData, isLoading} = useCustomerByCustomerId(user);

  if (isLoading)
    return (
      <Text marginB-s3 text60>
        Loading
      </Text>
    );

  return (
    <Card borderRadius={0} marginB-s5 padding-15 enableShadow={false}>
      <Text marginB-s3 text60>
        {translations.userProfile}
      </Text>
      <Text>{customerData.firstname}</Text>
      <Text>{customerData.lastname}</Text>
      <Text>{customerData.email}</Text>
      <View row marginT-s3>
        <Button
          size="tiny"
          onPress={() =>
            navigation.navigate(AppRoute.PROFILE_EDIT, {
              userData: customerData,
            })
          }
          accessoryLeft={EditIcon}>
          {translations.edit}
        </Button>
        <Button
          size="tiny"
          status="danger"
          onPress={() =>
            navigation.navigate(AppRoute.PASSWORD_EDIT, {
              userData: customerData,
            })
          }
          accessoryLeft={EditIcon}>
          Password Change
        </Button>
      </View>
    </Card>
  );
}
