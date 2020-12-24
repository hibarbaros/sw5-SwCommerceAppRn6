import {useQuery, useMutation} from 'react-query';
import Toast from 'react-native-toast-message';

import {
  addressDetail,
  addressDelete,
  addressAdd,
  addressEdit,
} from '../actions/addressactions';
import {customerData} from '../actions/useractions';

const getAddressById = async (addressId) => {
  const data = await addressDetail(addressId);
  return data;
};

export function useAddress(addressId) {
  return useQuery(['addressData', addressId], () => getAddressById(addressId));
}

const getUserAddressByUserId = async (userId) => {
  const data = await customerData(userId);
  return data.address;
};

export function useAddressesByUserId(userId) {
  return useQuery(['userAddressesData', userId], () =>
    getUserAddressByUserId(userId),
  );
}

export const useListMutation = () => {
  const [deleteAddress, {isLoading: isDeleteLoading}] = useMutation(
    addressDelete,
    {
      onSuccess: (data) => {
        if (data) {
          Toast.show({
            text1: 'Success',
            text2: 'Ihre Transaktion ist erfolgreich',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Bitte überprüfen Sie Ihr Formular',
          });
        }
      },
      onError: (error) => {
        console.log('error', error);
      },
    },
  );

  const [addAddress, {isLoading: isAddAddressLoading}] = useMutation(
    addressAdd,
    {
      onSuccess: (data) => {
        if (!data) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Something went wrong',
          });
        } else {
          return true;
        }
      },
      onError: (error) => {
        console.log('error', error);
      },
    },
  );

  const [editAddress, {isLoading: isEditAddressLoading}] = useMutation(
    addressEdit,
    {
      onSuccess: (data) => {
        if (!data) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Something went wrong',
          });
        }
      },
      onError: (error) => {
        console.log('error', error);
      },
    },
  );

  return {
    deleteAddress,
    isDeleteLoading,
    addAddress,
    isAddAddressLoading,
    editAddress,
    isEditAddressLoading,
  };
};
