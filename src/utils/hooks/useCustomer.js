import {useContext} from 'react';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import Toast from 'react-native-toast-message';
//*context
import {LocalizationContext} from '../../context/Translations';
import AppContext from '../../context/AppContext';
import CartContext from '../../context/CartContext';
//*actions
import {
  customerData,
  customerRegister,
  customerEdit,
  checkUserForLogin,
  passwordEdit,
  userLogin,
} from '../actions/useractions';
import {migrateUserCart} from '../actions/cartactions';
//*normalize
import {initialCartNormalize} from '../normalize/cartNormalize';

//!Get Customer by Id
const getCustomerByCustomerId = async (userId) => {
  const response = await customerData(userId);
  return response;
};

export function useCustomerByCustomerId(userId, options) {
  return useQuery(
    ['userData', userId],
    () => getCustomerByCustomerId(userId),
    options,
  );
}
//!Get Customer by Id

//!Customer logout
export function useCustomerLogout() {
  const {logoutUserContext} = useContext(AppContext);
  const {setInitialUserCart} = useContext(CartContext);

  const mutate = useMutation(logoutUserContext, {
    onSuccess: () => {
      setInitialUserCart([]);
    },
  });

  return mutate;
}
//!Customer logout

//!Customer login
const getCustomerLogin = async (values, userCart) => {
  const response = await userLogin(values);
  const {id, sessionId} = response;
  if (userCart) {
    await migrateUserCart(id, userCart, sessionId);
  }
  return response;
};

export function useCustomerLogin() {
  const {translations} = useContext(LocalizationContext);
  const {setUserContext} = useContext(AppContext);
  const {userCart, setInitialUserCart} = useContext(CartContext);

  const mutate = useMutation((values) => getCustomerLogin(values, userCart), {
    onSuccess: async (response) => {
      const {id, sessionId} = response;
      if (response) {
        const userResponse = await customerData(id);
        const {basket} = userResponse;
        setInitialUserCart(initialCartNormalize(basket));
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
//!Customer login

//!Check Customer By Mail
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
//!Check Customer By Mail

//!Register customer
const getRegisterCustomer = async (values, userCart) => {
  const response = await customerRegister(values);
  const {
    data: {id, sessionId},
  } = response;
  if (userCart) {
    await migrateUserCart(id, userCart, sessionId);
  }
  return response;
};

export function useRegisterCustomer() {
  const {setUserContext} = useContext(AppContext);
  const {userCart} = useContext(CartContext);

  const mutate = useMutation(
    (values) => getRegisterCustomer(values, userCart),
    {
      onSuccess: (response) => {
        if (response) {
          setUserContext(response.data.id, response.data.sessionId);
          return true;
        }
        if (!response) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'This e-mail address is registered',
          });
          return false;
        }
      },
    },
  );

  return mutate;
}
//!Register customer

//!Edit customer
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
//!Edit customer

//!Edit customer password
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
        cache.invalidateQueries('userData', data.id);
        Toast.show({
          text1: 'Success',
          text2: translations.formularSuccess,
        });
      }
      if (!data) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Old Password is false',
        });
      }
    },
  });

  return mutate;
}
//!Edit customer password
