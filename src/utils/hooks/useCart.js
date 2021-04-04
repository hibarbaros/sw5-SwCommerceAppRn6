import {useContext} from 'react';
import {useMutation, useQuery} from 'react-query';
import Toast from 'react-native-toast-message';
import _ from 'lodash';

import {LocalizationContext} from '../../context/Translations';
import AppContext from '../../context/AppContext';
import CartContext from '../../context/CartContext';

import {
  getCartBySessionId,
  removeFromCart,
  getCartByUserId,
  addInitialUserCart,
  removeInitialUserCart,
  migrateUserCart,
} from '../actions/cartactions';

//Get Customer Cart
const getUserCart = async (user, sessionId) => {
  if (user) {
    const data = await getCartByUserId(user);
    return data;
  } else {
    const data = await getCartBySessionId(sessionId);
    return data;
  }
};

export function useUserCart() {
  const {sessionId, user, userCart} = useContext(AppContext);
  if (user) {
    return useQuery(['userCart', sessionId], () =>
      getUserCart(user, sessionId),
    );
  } else {
    return useQuery('initialUserCart', () => userCart);
  }
}
//Get Customer Cart

//Add to Cart
const getAddToCart = async (mutateVariables, userCart, setUserCart) => {
  const {productData, selectedVariants} = mutateVariables;

  if (selectedVariants) {
    const filteredVariants = _.filter(productData.details, {
      configuratorOptions: selectedVariants,
    });
    const [variantProduct] = filteredVariants;
    mutateVariables.number = variantProduct.number;
  } else {
    mutateVariables.number = productData.number;
  }
  const response = addInitialUserCart(userCart, mutateVariables);
  return response;
};

export function useAddToCart() {
  const {translations} = useContext(LocalizationContext);
  const {userCart, setInitialUserCart, setUserCart} = useContext(CartContext);

  const mutate = useMutation(
    (mutateVariables) => getAddToCart(mutateVariables, userCart, setUserCart),
    {
      onSuccess: (res) => {
        const newList = [...res];
        setInitialUserCart(newList);
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

//Remove to Cart
const getRemoveToCart = async (productNumber, user, userCart) => {
  // if (user) {
  //   await removeFromCart(productNumber, user);
  // }
  const response = removeInitialUserCart(userCart, productNumber);
  return response;
};

export function useRemoveToCart() {
  const {user} = useContext(AppContext);
  const {userCart, setInitialUserCart} = useContext(CartContext);

  const mutate = useMutation(
    (productNumber) => getRemoveToCart(productNumber, user, userCart),
    {
      onSuccess: (res) => {
        setInitialUserCart(res);
      },
    },
  );

  return mutate;
}
//Remove to Cart

//Migrate User Cart
const getMigrateUserCart = async (user, userCart, sessionId) => {
  const response = migrateUserCart(user, userCart, sessionId);
  return response;
};

export function useMigrateUserCart() {
  const {user, userCart, sessionId} = useContext(AppContext);

  const mutate = useMutation(
    () => getMigrateUserCart(user, userCart, sessionId),
    {
      onSuccess: (res) => {
        // setInitialUserCart(res);
      },
    },
  );

  return mutate;
}
//Migrate User Cart
