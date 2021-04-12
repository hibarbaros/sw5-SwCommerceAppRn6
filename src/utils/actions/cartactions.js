import _ from 'lodash';

import Api from '../api';
import {cartNormalize} from '../normalize/cartNormalize';

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

//Database cart fonksiyonlari: Kullanici login ise kullaniliyor
export async function removeFromCart(productNumber, user) {
  const checktoBasket = await getCartByUserId(user);
  const finded = checktoBasket.find((x) => x.orderNumber === productNumber);
  await Api.delete(`/ConnectorBasket/${finded.id}`);
  return true;
}

export async function addFromCart(mutateVariables, user, sessionId) {
  const checktoBasket = await getCartByUserId(user);
  const finded = checktoBasket.find(
    (x) => x.orderNumber === mutateVariables.number,
  );
  if (finded) {
    const formDataPut = {
      quantity: finded.quantity + mutateVariables.quantity,
    };
    Api.put(`/ConnectorBasket/${finded.id}`, formDataPut);
  } else {
    const productGet = await Api.get(
      `/ConnectorArticles/${mutateVariables.productData.id}`,
    );
    const formDataPost = cartNormalize(
      productGet.data,
      mutateVariables.quantity,
      user,
      sessionId,
    );
    await Api.post('/ConnectorBasket', formDataPost);
  }
  return true;
}
//Database cart fonksiyonlari: Kullanici login ise kullaniliyor

//Context Api cart fonksiyonlari
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
//Context Api cart fonksiyonlari

//Kullanici login olduktan sonra cart migrate fonksiyonu
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
        user,
        sessionId,
      );
      Api.post('/ConnectorBasket', formDataPost);
    }
  }

  // const migratePromise = await Promise.all(
  //   userCart.map(async (n) => {
  //     const finded = _.find(data, {orderNumber: n.number});
  //     if (finded) {
  //       const formDataPut = {
  //         quantity: finded.quantity + n.quantity,
  //       };
  //       Api.put(`/ConnectorBasket/${finded.id}`, formDataPut);
  //       return true;
  //     } else {
  //       const productGet = await Api.get(`/ConnectorArticles/${n.id}`);
  //       const formDataPost = cartNormalize(
  //         productGet.data,
  //         n.quantity,
  //         user,
  //         sessionId,
  //       );
  //       Api.post('/ConnectorBasket', formDataPost);
  //       return true;
  //     }
  //   }),
  // );

  return true;
}
//Kullanici login olduktan sonra cart migrate fonksiyonu
