import React from 'react';
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

export function useCustomerByCustomerId(userId) {
  return useQuery(['userData', userId], () => getCustomerByCustomerId(userId));
}

const getCustomerCheckByCustomerMail = async (values) => {
  const data = await checkUserForLogin(values);
  return data;
};

export function useCustomerCheckByMail() {
  return useMutation((values) => getCustomerCheckByCustomerMail(values), {
    onSuccess: (data) => {
      if (!data) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Diese E-Mail Adresse ist bereits registriert worden',
        });
      } else {
        setUserStorage(data.data.id);
        return data;
      }
    },
  });
}

export const useListMutation = async () => {
  const {translations} = React.useContext(LocalizationContext);
  const cache = useQueryClient();

  const mutation = useMutation((values) => checkUserForLogin(values), {
    onSuccess: (data) => console.log('data', data),
  });

  //Add customer
  const [mutateAddCustomer, {isLoading: addCustomerLoading}] = useMutation(
    customerRegister,
    {
      onError: (e) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: e.message,
        });
      },
      onSuccess: (data) => {
        if (!data) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Diese E-Mail Adresse ist bereits registriert worden',
          });
        } else {
          setUserStorage(data.data.id);
          return data;
        }
      },
    },
  );

  //Edit Customer
  const [mutateEditCustomer, {isLoading: editCustomerLoading}] = useMutation(
    customerEdit,
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
          cache.invalidateQueries('userData', data.customerId);
          Toast.show({
            text1: 'Success',
            text2: translations.formularSuccess,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: translations.formularError,
          });
        }
      },
    },
  );

  //Edit Password
  const [mutateEditPassword, {isLoading: editPasswordLoading}] = useMutation(
    passwordEdit,
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
          cache.invalidateQueries('userData', data.customerId);
          Toast.show({
            text1: 'Success',
            text2: translations.formularSuccess,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: translations.formularError,
          });
        }
      },
    },
  );

  //Check Customer For Login
  const {mutateCheckCustomer, isLoading: loadingcheckCustomer} = useMutation(
    (values) => checkUserForLogin(values),
    {
      onError: (e) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: e.message,
        });
      },
      onSuccess: (data) => {
        console.log(
          '🚀 ~ file: useCustomer.js ~ line 124 ~ useListMutation ~ data',
          data,
        );
        if (!data) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Benutzer wurde nicht gefunden',
          });
        } else {
          return data;
        }
      },
    },
  );

  return {
    mutateAddCustomer,
    addCustomerLoading,
    mutateCheckCustomer,
    mutateEditCustomer,
    editCustomerLoading,
    mutateEditPassword,
    editPasswordLoading,
    loadingcheckCustomer,
    mutation,
  };
};
