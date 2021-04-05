import _ from 'lodash';

import Api from '../api';
import {cartNormalize} from '../normalize/cartNormalize';
import {findVariantProductOrderNumber} from '../functions';

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
    `/ConnectorBasket?filter[0][property]=customerId&filter[0][value]=${userId}`,
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

//TODO: promise ile yeniden tasarla
export async function addToCartSimpleProduct(mutateVariables, user, sessionId) {
  const {productData, quantity, selectedVariants} = mutateVariables;
  if (selectedVariants) {
    const findedVariantProduct = findVariantProductOrderNumber(
      productData,
      selectedVariants,
    );
    productData.number = findedVariantProduct.number;
    productData.prices = findedVariantProduct.prices;
  }
  const checktoBasket = await getFindCartBySessionId(
    sessionId,
    productData.mainDetail.number,
  );
  if (checktoBasket) {
    const formData = {
      quantity: checktoBasket.quantity + quantity,
    };
    return await Api.put(`/ConnectorBasket/${checktoBasket.id}`, formData);
  } else {
    const formData = cartNormalize(productData, quantity, user, sessionId);
    return await Api.post('/ConnectorBasket', formData);
  }
}

export async function removeFromCart(mutateVariables, sessionId) {
  const {productData} = mutateVariables;
  const checktoBasket = await getFindCartBySessionId(
    sessionId,
    productData.mainDetail.number,
  );
  return await Api.delete(`/ConnectorBasket/${checktoBasket.id}`);
}

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
    finded.quantity = finded.quantity + mutateVariables.quantity;
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

export async function migrateUserCart(user, userCart, sessionId) {
  const response = await Api.get(
    `/ConnectorBasket?filter[0][property]=customerId&filter[0][value]=${user}`,
  );
  const {data} = response;
  _.map(userCart, (n) => {
    const finded = _.find(data, {orderNumber: n.number});
    if (finded) {
      const formData = {
        quantity: finded.quantity + n.quantity,
      };
      Api.put(`/ConnectorBasket/${finded.id}`, formData);
    } else {
      const response = Api.get(`/ConnectorArticles/${n.id}`);
      console.log(
        '🚀 ~ file: cartactions.js ~ line 114 ~ _.map ~ response',
        response,
      );
      // const formData = cartNormalize(productData, n.quantity, user, sessionId);
      // Api.post('/ConnectorBasket', formData);
    }
  });
  return true;
}
