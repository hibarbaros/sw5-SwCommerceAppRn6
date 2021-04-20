import {useContext} from 'react';
import {useMutation, useQuery} from 'react-query';
import Toast from 'react-native-toast-message';
import _ from 'lodash';

import {LocalizationContext} from '../../context/Translations';
import AppContext from '../../context/AppContext';
import CartContext from '../../context/CartContext';

import {priceWithTax} from '../../utils/functions';

import {
  getCartBySessionId,
  removeFromCart,
  addFromCart,
  getCartByUserId,
  addInitialUserCart,
  removeInitialUserCart,
  migrateUserCart,
  findProductVariant,
} from '../actions/cartactions';

import {productsWithFilter} from '../actions/articleactions';

//!Get Customer Cart
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
//!Get Customer Cart

//!Cart Total Price
const getUserCartTotalPrice = async (userCart) => {
  let netPrice = 0;
  let taxPrice = 0;
  const reducer = _.reduce(
    userCart,
    (prevValue, reduceProduct) => {
      return `${prevValue}&filter[id][]=${reduceProduct.id}`;
    },
    '',
  );
  const filteredProductList = await productsWithFilter(reducer);
  const mapped = _.map(filteredProductList, 'details');
  const flattenDeep = _.flattenDeep(mapped);
  for (const cartProduct of userCart) {
    const mainProduct = _.find(filteredProductList, {id: cartProduct.id});
    const findedProduct = _.find(flattenDeep, {
      number: cartProduct.number,
    });
    const [price] = findedProduct.prices;
    const priceCalc = priceWithTax(price.price, mainProduct.tax.tax);
    netPrice += priceCalc * cartProduct.quantity;
    const taxCalc = price.price * (mainProduct.tax.tax / 100);
    taxPrice += taxCalc * cartProduct.quantity;
  }
  return {netPrice, taxPrice};
};

export function useUserCartTotalPrice() {
  const {userCart} = useContext(CartContext);
  let priceTotal = 0;
  return useQuery(['userCartTotalPrice', userCart], () =>
    getUserCartTotalPrice(userCart, priceTotal),
  );
}
//!Cart Total Price

//!Add to Cart
const getAddToCart = async (mutateVariables, userCart, user, sessionId) => {
  const foundVariant = await findProductVariant(mutateVariables);
  if (user) {
    await addFromCart(foundVariant, user, sessionId);
  }
  const response = addInitialUserCart(userCart, foundVariant);
  return response;
};

export function useAddToCart() {
  const {translations} = useContext(LocalizationContext);
  const {user, sessionId} = useContext(AppContext);
  const {userCart, setInitialUserCart} = useContext(CartContext);

  const mutate = useMutation(
    (mutateVariables) =>
      getAddToCart(mutateVariables, userCart, user, sessionId),
    {
      onSuccess: (res) => {
        setInitialUserCart([...res]);
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
//!Add to Cart

//!Remove to Cart
const getRemoveToCart = async (productNumber, user, userCart) => {
  if (user) {
    await removeFromCart(productNumber, user);
  }
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
//!Remove to Cart

//!Migrate User Cart
const getMigrateUserCart = async (user, userCart, sessionId) => {
  const response = migrateUserCart(user, userCart, sessionId);
  return response;
};

export function useMigrateUserCart() {
  const {user, sessionId} = useContext(AppContext);
  const {userCart} = useContext(CartContext);

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
//!Migrate User Cart
