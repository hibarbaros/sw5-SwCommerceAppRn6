import {useContext} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import Toast from 'react-native-toast-message';

import {LocalizationContext} from '../../context/Translations';
import AppContext from '../../context/AppContext';

import {
  addToCartSimpleProduct,
  getCartBySessionId,
  removeFromCart,
} from '../actions/cartactions';

//Add to Cart
const getAddToCart = async (mutateVariables, user, sessionId) => {
  const response = await addToCartSimpleProduct(
    mutateVariables,
    user,
    sessionId,
  );
  return response;
};

export function useAddToCart() {
  const {translations} = useContext(LocalizationContext);
  const {user, sessionId} = useContext(AppContext);
  const cache = useQueryClient();

  const mutate = useMutation(
    (mutateVariables) => getAddToCart(mutateVariables, user, sessionId),
    {
      onSuccess: () => {
        cache.invalidateQueries('userCart');
        cache.invalidateQueries('userCartCount');
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: translations.addToCartMessage,
        });
      },
    },
  );

  return mutate;
}
//Add to Cart

//Get Customer Cart
const getUserCart = async (sessionId) => {
  const data = await getCartBySessionId(sessionId);
  return data;
};

export function useUserCart(sessionId) {
  return useQuery(['userCart', sessionId], () => getUserCart(sessionId));
}
//Get Customer Cart

//Remove to Cart
const getRemoveToCart = async (mutateVariables, sessionId) => {
  const data = await removeFromCart(mutateVariables, sessionId);
  return data;
};

export function useRemoveToCart() {
  const {sessionId} = useContext(AppContext);
  const cache = useQueryClient();

  const mutate = useMutation(
    (mutateVariables) => getRemoveToCart(mutateVariables, sessionId),
    {
      onSuccess: () => {
        cache.invalidateQueries('userCart');
        cache.invalidateQueries('userCartCount');
      },
    },
  );

  return mutate;
}
//Remove to Cart
