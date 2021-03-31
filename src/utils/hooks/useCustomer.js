import {useContext} from 'react';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import Toast from 'react-native-toast-message';

import {LocalizationContext} from '../../context/Translations';
import AppContext from '../../context/AppContext';

import {
  customerData,
  customerRegister,
  setUserStorage,
  customerEdit,
  checkUserForLogin,
  passwordEdit,
  userLogin,
} from '../actions/useractions';

// import {changeCartSessionIdAndUserId} from '../actions/cartactions';

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

//Customer logout
export function useCustomerLogout() {
  const {logoutUserContext, sessionId} = useContext(AppContext);
  const cache = useQueryClient();

  const mutate = useMutation(logoutUserContext, {
    onSuccess: () => {
      cache.invalidateQueries(['userCart', sessionId]);
      cache.invalidateQueries('userCartCount');
      cache.invalidateQueries('nonUserCartCount');
    },
  });

  return mutate;
}
//Customer logout

//Customer login

const getCustomerLogin = async (values, sessionId, user) => {
  const data = await userLogin(values, sessionId, user);
  return data;
};

export function useCustomerLogin() {
  const {translations} = useContext(LocalizationContext);
  const {setUserContext, sessionId, user} = useContext(AppContext);
  const cache = useQueryClient();

  const mutate = useMutation(
    (values) => getCustomerLogin(values, sessionId, user),
    {
      onSuccess: (data) => {
        const {id, sessionId: dataSessionId} = data;
        if (data) {
          setUserContext(id, dataSessionId);
          cache.invalidateQueries(['userCart', sessionId]);
          cache.invalidateQueries('userCartCount');
          // cache.invalidateQueries('nonUserCartCount');
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: translations.passwordFalsch,
          });
        }
      },
    },
  );

  return mutate;
}

//Customer login

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
const getRegisterCustomer = async (values, sessionId) => {
  const data = await customerRegister(values, sessionId);
  return data;
};

export function useRegisterCustomer() {
  const {translations} = useContext(LocalizationContext);
  const {sessionId} = useContext(AppContext);

  const mutate = useMutation(
    (values) => getRegisterCustomer(values, sessionId),
    {
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
    },
  );

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
