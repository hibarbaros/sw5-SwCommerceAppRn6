import DeviceInfo from 'react-native-device-info';
import moment from 'moment';

export function cartNormalize(productData, quantity, user, sessionId) {
  const deviceId = DeviceInfo.getDeviceId();
  const taxInt = parseInt(productData.tax.tax, 10);
  const [price] = productData.mainDetail.prices;
  const articleName = productData.name;
  const formData = {
    customerId: user,
    articleId: productData.id,
    orderNumber: productData.mainDetail.number,
    taxRate: taxInt,
    sessionId,
    partnerId: '',
    articleName,
    shippingFree: 0,
    quantity: quantity,
    price: Math.round(price.price * (taxInt / 100 + 1)),
    netPrice: price.price,
    date: moment(),
    mode: 0,
    esdArticle: 0,
    lastViewPort: 'mobile',
    userAgent: deviceId,
    config: '',
    currencyFactor: 1,
  };
  return formData;
}

export function initialCartNormalize(list) {
  return list.map((product) => ({
    id: parseInt(product.articleID, 10),
    number: product.ordernumber,
    quantity: product.quantity,
  }));
}
