import _ from 'lodash';

import Api from '../api';
import {cartNormalize} from '../normalize/cartNormalize';
import {productsWithFilter} from '../actions/articleactions';
import {priceWithTax} from '../../utils/functions';

export async function getCartBySessionId(sessionId) {
  const response = await Api.get(
    `/ConnectorBasket?filter[0][property]=sessionId&filter[0][value]=${sessionId}`,
  );
  if (response) {
    return response.data;
  } else {
    return false;
  }
}

export async function getCartByUserId(userId) {
  const response = await Api.get(
    `/ConnectorBasket?filter[customerId]=${userId}`,
  );
  if (response) {
    return response.data;
  } else {
    return false;
  }
}

export async function getFindCartBySessionId(sessionId, orderNumber) {
  const response = await Api.get(
    `/ConnectorBasket?filter[0][property]=sessionId&filter[0][value]=${sessionId}`,
  );
  const finded = response.data.find((x) => x.orderNumber === orderNumber);
  if (finded) {
    return finded;
  } else {
    return false;
  }
}

//!Database cart fonksiyonlari: Kullanici login ise kullaniliyor
export async function removeFromCart(productNumber, user) {
  const checktoBasket = await getCartByUserId(user);
  const finded = checktoBasket.find((x) => x.orderNumber === productNumber);
  await Api.delete(`/ConnectorBasket/${finded.id}`);
  return true;
}

export async function addFromCart(mutateVariables, user, sessionId) {
  const {productData, quantity, number} = mutateVariables;
  const checktoBasket = await getCartByUserId(user);
  const finded = checktoBasket.find((x) => x.orderNumber === number);
  if (finded) {
    const formDataUpdate = {
      quantity: finded.quantity + quantity,
    };
    Api.put(`/ConnectorBasket/${finded.id}`, formDataUpdate);
  } else {
    const formDataPost = cartNormalize(
      productData,
      quantity,
      number,
      user,
      sessionId,
    );
    await Api.post('/ConnectorBasket', formDataPost);
  }
  return true;
}
//!Database cart fonksiyonlari: Kullanici login ise kullaniliyor

//!Context Api cart fonksiyonlari
export async function addInitialUserCart(userCart, mutateVariables) {
  const newList = userCart ? userCart : [];
  const finded = newList.find(
    (x) => x.number === mutateVariables.productData.number,
  );
  if (!finded || !userCart) {
    newList.unshift({
      id: mutateVariables.productData.id,
      number: mutateVariables.number,
      quantity: mutateVariables.quantity,
      variantId: mutateVariables.variantId,
    });
  } else {
    finded.quantity =
      parseInt(finded.quantity, 10) + parseInt(mutateVariables.quantity, 10);
  }
  return newList;
}

export async function removeInitialUserCart(userCart, productNumber) {
  const newList = [...userCart];
  _.remove(newList, (n) => {
    return n.number === productNumber;
  });
  return newList;
}
//!Context Api cart fonksiyonlari

//!Kullanici login ve register olduktan sonra cart migrate fonksiyonu
//TODO: migration fonksiyonu php api de düzenle
export async function migrateUserCart(user, userCart, sessionId) {
  const response = await Api.get(`/ConnectorBasket?filter[customerId]=${user}`);
  const {data} = response;
  for (const cartProduct of userCart) {
    const finded = _.find(data, {orderNumber: cartProduct.number});
    if (finded) {
      const formDataPut = {
        quantity: finded.quantity + cartProduct.quantity,
      };
      Api.put(`/ConnectorBasket/${finded.id}`, formDataPut);
    } else {
      const productGet = await Api.get(`/ConnectorArticles/${cartProduct.id}`);
      const formDataPost = cartNormalize(
        productGet.data,
        cartProduct.quantity,
        cartProduct.number,
        user,
        sessionId,
      );
      Api.post('/ConnectorBasket', formDataPost);
    }
  }
  return true;
}
//!Kullanici login ve register olduktan sonra cart migrate fonksiyonu

//!variant varsa bulunuyor yoksa sadece ürün numarasi ekleniyor
export async function findProductVariant(mutateVariables) {
  const {productData, selectedVariants} = mutateVariables;
  if (selectedVariants) {
    const variantProduct = _.find(productData.details, {
      configuratorOptions: selectedVariants,
    });
    mutateVariables.number = variantProduct.number;
  } else {
    mutateVariables.number = productData.number;
    mutateVariables.variantId = productData.mainDetail.id;
  }
  return mutateVariables;
}
//!variant varsa bulunuyor yoksa sadece ürün numarasi ekleniyor

export async function userCartPriceCalculation(userCart) {
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
}
