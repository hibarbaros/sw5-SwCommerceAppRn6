import React, {useContext} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {View} from 'react-native-ui-lib';
import {Button} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

import {LocalizationContext} from '../../context/Translations';

import {Container} from '../../themes/components';
import UserProfile from '../../components/UserComponents/UserProfile';
import UserAddressList from '../../components/UserComponents/UserAddressList';
import {EditIcon} from '../../themes/components/IconSet';
import AppRoute from '../../utils/approutes';

export default function UserScreen({customerData}) {
  const navigation = useNavigation();
  const {translations} = useContext(LocalizationContext);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <UserProfile />
          <View row marginT-s3>
            <Button
              size="tiny"
              onPress={() => navigation.navigate(AppRoute.PROFILE_EDIT)}
              accessoryLeft={EditIcon}>
              {translations.edit}
            </Button>
            <Button
              size="tiny"
              status="danger"
              onPress={() => navigation.navigate(AppRoute.PASSWORD_EDIT)}
              accessoryLeft={EditIcon}>
              Password Change
            </Button>
          </View>
          <UserAddressList />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}
