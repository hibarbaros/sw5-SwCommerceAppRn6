import moment from 'moment';
import _ from 'lodash';

export function orderNormalize(mutateVariables) {
  const {
    user,
    paymentMethodId,
    currency,
    selectedShippingAddress,
    selectedBilllingAddress,
    selectedShippingMethod,
    details,
  } = mutateVariables;

  selectedShippingAddress.company = '';
  selectedBilllingAddress.company = '';
  selectedShippingAddress.department = '';
  selectedBilllingAddress.department = '';
  selectedShippingAddress.phone = '';
  selectedBilllingAddress.phone = '';

  const fullDate = moment().format('YYYY-MM-DD h:mm:ss');
  const shippingPrice = parseInt(selectedShippingMethod.detail.value, 10);
  const total = _.sumBy(details.data, 'netPrice');

  const orderProducts = details.data.map((product) => ({
    articleId: product.articleId,
    taxId: 1,
    taxRate: product.taxRate,
    statusId: 0,
    articleNumber: product.orderNumber,
    price: product.price,
    quantity: product.quantity,
    articleName: product.articleName,
    shipped: 0,
    shippedGroup: 0,
    mode: 0,
    esdArticle: 0,
  }));

  //TODO stateId incelenemeli

  const allData = {
    customerId: user,
    paymentId: paymentMethodId,
    dispatchId: selectedShippingMethod.id,
    partnerId: '',
    shopId: 1,
    invoiceAmount: total,
    invoiceAmountNet: total + shippingPrice,
    invoiceShipping: shippingPrice,
    invoiceShippingNet: shippingPrice,
    orderTime: fullDate,
    net: 0,
    taxFree: 0,
    languageIso: '1',
    currency: currency.currency,
    currencyFactor: currency.factor,
    details: orderProducts,
    documents: [],
    billing: selectedBilllingAddress,
    shipping: selectedShippingAddress,
    paymentStatusId: 17,
    orderStatusId: 0,
    deviceType: 'application',
  };

  const formData = JSON.stringify({
    ...allData,
  });

  return formData;
}
