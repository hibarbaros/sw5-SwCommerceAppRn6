import {useContext} from 'react';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import Toast from 'react-native-toast-message';

import {LocalizationContext} from '../../context/Translations';
import AppContext from '../../context/AppContext';
import CartContext from '../../context/CartContext';

import {
  customerData,
  customerRegister,
  setUserStorage,
  customerEdit,
  checkUserForLogin,
  passwordEdit,
  userLogin,
} from '../actions/useractions';

import {migrateUserCart} from '../actions/cartactions';
import {initialCartNormalize} from '../normalize/cartNormalize';

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
  const {logoutUserContext} = useContext(AppContext);
  const {setInitialUserCart} = useContext(CartContext);

  const mutate = useMutation(logoutUserContext, {
    onSuccess: () => {
      setInitialUserCart(null);
    },
  });

  return mutate;
}
//Customer logout

//Customer login
const getCustomerLogin = async (values) => {
  const response = await userLogin(values);
  return response;
};

export function useCustomerLogin() {
  const {translations} = useContext(LocalizationContext);
  const {setUserContext} = useContext(AppContext);
  const {userCart, setInitialUserCart} = useContext(CartContext);

  const mutate = useMutation((values) => getCustomerLogin(values), {
    onSuccess: async (data) => {
      const {id, sessionId} = data;
      console.log('data :>> ', data);
      if (data) {
        if (userCart) {
          await migrateUserCart(id, userCart, sessionId);
        }
        setTimeout(async () => {
          const userResponse = await customerData(id);
          const {basket} = userResponse;
          setInitialUserCart(initialCartNormalize(basket));
        }, 1000);

        setUserContext(id, sessionId);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: translations.passwordFalsch,
        });
      }
    },
  });

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
const getRegisterCustomer = async (values) => {
  const data = await customerRegister(values);
  return data;
};

export function useRegisterCustomer() {
  // const {translations} = useContext(LocalizationContext);
  const {setUserContext} = useContext(AppContext);

  const mutate = useMutation((values) => getRegisterCustomer(values), {
    onSuccess: (data) => {
      if (data) {
        setUserContext(data.data.id, data.data.sessionId);
        return true;
      }
      if (!data) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'This e-mail address is registered',
        });
        return false;
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
