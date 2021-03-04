import {useContext} from 'react';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import {LocalizationContext} from '../../context/Translations';

import {
  customerData,
  customerRegister,
  setUserStorage,
  customerEdit,
  checkUserForLogin,
  passwordEdit,
} from '../actions/useractions';
import Toast from 'react-native-toast-message';

const getCustomerByCustomerId = async (userId) => {
  const data = await customerData(userId);
  return data;
};

export function useCustomerByCustomerId(userId, options) {
  return useQuery(
    ['userData', userId],
    () => getCustomerByCustomerId(userId),
    options,
  );
}

//Check Customer By Mail
const getCustomerCheckByCustomerMail = async (values) => {
  const data = await checkUserForLogin(values);
  return data;
};

export function useCustomerCheckByMail() {
  const {translations} = useContext(LocalizationContext);

  const mutate = useMutation(
    (values) => getCustomerCheckByCustomerMail(values),
    {
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
            text2: translations.emailBereits,
          });
        }
      },
    },
  );

  return mutate;
}

//Check Customer By Mail

//Register customer
const getRegisterCustomer = async (values) => {
  const data = await customerRegister(values);
  return data;
};

export function useRegisterCustomer() {
  const {translations} = useContext(LocalizationContext);

  const mutate = useMutation((values) => getRegisterCustomer(values), {
    onError: (e) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e.message,
      });
    },
    onSuccess: (data) => {
      if (data) {
        setUserStorage(data.id);
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
//Register customer

//Edit customer
const getEditCustomer = async (values) => {
  const data = await customerEdit(values);
  return data;
};

export function useEditCustomer() {
  const {translations} = useContext(LocalizationContext);
  const cache = useQueryClient();

  const mutate = useMutation((values) => getEditCustomer(values), {
    onError: (e) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e.message,
      });
    },
    onSuccess: (data) => {
      if (data) {
        cache.invalidateQueries('userData', data.customerId);
        Toast.show({
          text1: 'Success',
          text2: translations.formularSuccess,
        });
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

//Edit customer

//Edit customer password
const getEditCustomerPassword = async (values) => {
  const data = await passwordEdit(values);
  return data;
};

export function useEditCustomerPassword() {
  const {translations} = useContext(LocalizationContext);
  const cache = useQueryClient();

  const mutate = useMutation((values) => getEditCustomerPassword(values), {
    onError: (e) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e.message,
      });
    },
    onSuccess: (data) => {
      if (data) {
        cache.invalidateQueries('userData', data.customerId);
        Toast.show({
          text1: 'Success',
          text2: translations.formularSuccess,
        });
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

//Edit customer password
