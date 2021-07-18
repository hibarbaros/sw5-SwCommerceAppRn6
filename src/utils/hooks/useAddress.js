import {useQuery, useMutation, useQueryClient} from 'react-query';
import {useLocalizationContext} from '../../context/Translations';
import Toast from 'react-native-toast-message';

import {
  addressDetail,
  addressDelete,
  addressAddEdit,
} from '../actions/addressactions';
import {customerData} from '../actions/useractions';

//!Get Address
const getAddressById = async (addressId) => {
  const data = await addressDetail(addressId);
  return data;
};
export function useAddress(addressId) {
  return useQuery(['addressData', addressId], () => getAddressById(addressId));
}
//!Get Address

//!Get User Address
const getUserAddressByUserId = async (userId) => {
  const data = await customerData(userId);
  return data.address;
};
export function useAddressesByUserId(userId) {
  return useQuery(['userAddressesData', userId], () =>
    getUserAddressByUserId(userId),
  );
}
//!Get User Address

//!Delete Address
const getDeleteAddress = async (addressId) => {
  const data = await addressDelete(addressId);
  return data;
};

export function useDeleteAddress() {
  const {translations} = useLocalizationContext();
  const cache = useQueryClient();

  const mutate = useMutation((addressId) => getDeleteAddress(addressId), {
    onError: (e) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e.message,
      });
    },
    onSettled: () => {
      cache.invalidateQueries('userData');
    },
    onSuccess: (data) => {
      if (data) {
        cache.invalidateQueries('userData');
        Toast.show({
          text1: 'Success',
          text2: translations.formularSuccess,
        });
        return data;
      }
      if (!data) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: translations.formularError,
        });
      }
    },
  });

  return mutate;
}
//!Delete Address

//!Add-Edit Address
const getAddEditAddress = async (values) => {
  const data = await addressAddEdit(values);
  return data;
};

export function useAddEditAddress() {
  const {translations} = useLocalizationContext();

  const cache = useQueryClient();

  const mutate = useMutation((values) => getAddEditAddress(values), {
    onError: (e) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e.message,
      });
    },
    onSettled: () => {
      cache.invalidateQueries('userData');
    },
    onSuccess: (res) => {
      if (res) {
        cache.invalidateQueries('userData');
        Toast.show({
          text1: 'Success',
          text2: translations.formularSuccess,
        });
      }
      if (!res) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: translations.formularError,
        });
      }
    },
  });

  return mutate;
}
//!Add-Edit Address
