import {useContext} from 'react';
import {useQuery, useMutation} from 'react-query';
import {LocalizationContext} from '../../context/Translations';
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

//Delete Address
const getDeleteAddress = async (addressId) => {
  const data = await addressDelete(addressId);
  return data;
};

export function useDeleteAddress() {
  const {translations} = useContext(LocalizationContext);
  const mutate = useMutation((addressId) => getDeleteAddress(addressId), {
    onError: (e) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e.message,
      });
    },
    onSuccess: (data) => {
      if (data) {
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
//Delete Address

//Add Address
const getAddAddress = async (values) => {
  const data = await addressAdd(values);
  return data;
};

export function useAddAddress() {
  const {translations} = useContext(LocalizationContext);
  const mutate = useMutation((values) => getAddAddress(values), {
    onError: (e) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e.message,
      });
    },
    onSuccess: (data) => {
      if (data) {
        return true;
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
//Add Address

//Edit Address
const getEditAddress = async (values) => {
  const data = await addressEdit(values);
  return data;
};

export function useEditAddress() {
  const {translations} = useContext(LocalizationContext);
  const mutate = useMutation((values) => getEditAddress(values), {
    onError: (e) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e.message,
      });
    },
    onSuccess: (data) => {
      if (data) {
        return true;
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
//Edit Address
