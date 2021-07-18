import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Div} from 'react-native-magnus';

import {useLocalizationContext} from '../../context/Translations';

import {Container} from '../../themes/components';
import UserProfile from '../../components/UserComponents/UserProfile';
import {Button} from '../../themes/components';
import AppRoute from '../../utils/approutes';

export default function UserScreen({customerData}) {
  const navigation = useNavigation();
  const {translations} = useLocalizationContext();

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <UserProfile />
          <Div column>
            <Button
              variant="block"
              fontSize={12}
              block
              onPress={() => navigation.navigate(AppRoute.PROFILE_EDIT)}
              text={translations.edit}
            />
            <Button
              variant="block"
              fontSize={12}
              block
              onPress={() => navigation.navigate(AppRoute.PASSWORD_EDIT)}
              text="Change Password"
            />
            <Button
              variant="block"
              fontSize={12}
              block
              onPress={() => navigation.navigate(AppRoute.ADDRESSES)}
              text="Addresses"
            />
          </Div>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}
