import Api from '../api';
// import _ from 'lodash';

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

export async function addToCartSimpleProduct(mutateVariables, user, sessionId) {
  const {productData, quantity, selectedVariants} = mutateVariables;
  if (selectedVariants.length > 0) {
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
