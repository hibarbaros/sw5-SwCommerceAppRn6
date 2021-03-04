import React, {useContext} from 'react';
import AppContext from '../../../context/AppContext';
import {useNavigation} from '@react-navigation/native';
import {Button, ButtonGroup} from '@ui-kitten/components';
import {Card, View, Text} from 'react-native-ui-lib';
import {EditIcon, TrashIcon} from '../../../themes/components/IconSet';
import AppRoute from '../../../utils/approutes';

export default function UserShippingAddress({checkout = false}) {
  const navigation = useNavigation();
  const {user} = useContext(AppContext);
  const {defaultShippingAddress} = user;

  return (
    <>
      {defaultShippingAddress && (
        <Card borderRadius={0} marginB-s5 padding-15 enableShadow={false}>
          <Text marginB-s3 text60>
            Default Shipping Address
          </Text>
          <Text>{defaultShippingAddress.title}</Text>
          <Text>
            {defaultShippingAddress.firstname} {defaultShippingAddress.lastname}
          </Text>
          <Text>{defaultShippingAddress.street}</Text>
          <Text>{defaultShippingAddress.city}</Text>
          <Text>{defaultShippingAddress.zipcode}</Text>
          <Text>{defaultShippingAddress.country.name}</Text>
          {!checkout && (
            <View row marginT-s3 flex right>
              <ButtonGroup size="tiny">
                <Button accessoryLeft={TrashIcon}>Delete</Button>
                <Button
                  accessoryLeft={EditIcon}
                  onPress={() =>
                    navigation.navigate(AppRoute.ADDRESS_EDIT, {
                      userAddress: defaultShippingAddress,
                    })
                  }>
                  Edit
                </Button>
              </ButtonGroup>
            </View>
          )}
        </Card>
      )}
    </>
  );
}
