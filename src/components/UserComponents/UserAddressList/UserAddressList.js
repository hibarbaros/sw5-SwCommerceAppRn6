import React, {useState, useContext} from 'react';
import {View, ActionSheet, Text} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from 'react-query';

import {Button} from '../../../themes/components';
import UserAddressCard from '../UserAddressCard/UserAddressCard';
import LoadSpinner from '../../Common/LoadSpinner/LoadSpinner';
import AppRoute from '../../../utils/approutes';
import AppContext from '../../../context/AppContext';
import {useCustomerByCustomerId} from '../../../utils/hooks/useCustomer';
import {useListMutation} from '../../../utils/hooks/useAddress';

export default function UserAddressList({checkout = false}) {
  const navigation = useNavigation();
  const {user} = useContext(AppContext);
  const cache = useQueryClient();

  const [isTooltip, setisTooltip] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const {deleteAddress, isDeleteLoading} = useListMutation();

  function handleDelete() {
    deleteAddress(selectedAddressId, {
      onSettled: (data, error, mutationVariables) => {
        cache.invalidateQueries('userData');
      },
      throwOnError: true,
    });
  }

  function handleSetTooltip(adressId) {
    setisTooltip(true);
    setSelectedAddressId(adressId);
  }

  const {data: customerData, error, isLoading} = useCustomerByCustomerId(user);

  if (isLoading)
    return (
      <Text marginB-s3 text60>
        Loading
      </Text>
    );

  if (error)
    return (
      <Text marginB-s3 text60>
        {error.message}
      </Text>
    );

  return (
    <>
      <LoadSpinner isVisible={isDeleteLoading} />
      {customerData.address.map((address) => {
        return (
          <UserAddressCard
            key={address.id}
            checkout={checkout}
            setisTooltip={handleSetTooltip}
            userData={customerData}
            addressData={address}
          />
        );
      })}
      <View marginB-s5>
        <Button
          buttonType="primary"
          size="small"
          text="Add New Address"
          onPress={() =>
            navigation.navigate(AppRoute.ADDRESS_ADD, {
              userData: customerData,
            })
          }
        />
      </View>
      <ActionSheet
        title="Are you sure?"
        destructiveButtonIndex={0}
        useNativeIOS={true}
        options={[
          {label: 'Delete', onPress: () => handleDelete()},
          {label: 'Cancel', onPress: () => setisTooltip(false)},
        ]}
        visible={isTooltip}
        onDismiss={() => setisTooltip(false)}
      />
    </>
  );
}
