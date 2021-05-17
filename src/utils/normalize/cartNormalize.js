import DeviceInfo from 'react-native-device-info';
import moment from 'moment';

export function cartNormalize(
  productData,
  quantity,
  orderNumber,
  user,
  sessionId,
) {
  const deviceId = DeviceInfo.getDeviceId();
  const taxInt = parseInt(productData.tax.tax, 10);
  const [price] = productData.mainDetail.prices;
  const articleName = productData.name;
  const allData = {
    customerId: user,
    articleId: productData.id,
    orderNumber,
    taxRate: taxInt,
    sessionId,
    partnerId: '',
    articleName,
    shippingFree: 0,
    quantity: quantity,
    price: Math.round(price.price * (taxInt / 100 + 1)),
    netPrice: price.price,
    date: moment().format(),
    mode: 0,
    esdArticle: 0,
    lastViewPort: 'mobile',
    userAgent: deviceId,
    config: '',
    currencyFactor: 1,
  };

  //   {
  //     "customerId": 1,
  //     "articleId": 12,
  //     "orderNumber": "SW10012",
  //     "taxRate": 19,
  //     "sessionId": "i77la6fct88lksh2itbhr0mvi1",
  //     "partnerId": "",
  //     "shippingFree": 0,
  //     "quantity": 1,
  //     "price": 5,
  //     "netPrice": 4.2016806722689,
  //     "date": "2021-02-17T16:51:36+0100",
  //     "mode": 0,
  //     "esdArticle": 0,
  //     "lastViewPort": "mobile",
  //     "userAgent": "iphone",
  //     "config": "",
  //     "currencyFactor": 1
  // }

  const formData = JSON.stringify({
    ...allData,
  });
  return formData;
}

export function initialCartNormalize(list) {
  return list.map((product) => ({
    id: parseInt(product.articleID, 10),
    number: product.ordernumber,
    quantity: product.quantity,
  }));
}
