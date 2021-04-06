import DeviceInfo from 'react-native-device-info';
import moment from 'moment';

export function cartNormalize(productData, quantity, user, sessionId) {
  const deviceId = DeviceInfo.getDeviceId();
  const taxInt = parseInt(productData.tax.tax, 10);
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
    price: Math.round(
      productData.mainDetail.prices[0].price * (taxInt / 100 + 1),
    ),
    netPrice: productData.mainDetail.prices[0].price,
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
