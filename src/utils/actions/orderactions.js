import moment from 'moment';

import Api from '../api';
import {priceWithTax} from '../functions';

export async function orderbyCustomerList(customerId) {
	const response = await Api.get(`/ConnectorCustomers/${customerId}`);
	const allOrders = response.data.orders;
	if (allOrders) {
		return allOrders;
	} else {
		return null;
	}
}

export async function orderDetail(orderId) {
	const response = await Api.get(`/orders/${orderId}`);
	if (response.data) {
		return response.data;
	} else {
		return null;
	}
}

export async function orderCreate(orderData) {
	const {
		userCart,
		paymentMethodId,
		user,
		currency,
		selectedShippingAddress,
		selectedBilllingAddress,
		selectedShippingMethod,
	} = orderData;

	selectedShippingAddress.company = '';
	selectedBilllingAddress.company = '';
	selectedShippingAddress.department = '';
	selectedBilllingAddress.department = '';
	selectedShippingAddress.phone = '';
	selectedBilllingAddress.phone = '';

	const fullDate = moment().format('YYYY-MM-DD h:mm:ss');
	const shippingPrice = parseInt(selectedShippingMethod.detail.value).toFixed(
		2
	);

	let productList = [];
	let total = 0;

	userCart.forEach((product) => {
		let articlenumber;
		if (product.variantProduct) {
			articlenumber = product.variantProduct.number;
		}
		if (!product.variantProduct) {
			articlenumber = product.mainDetail.number;
		}
		const obj = {
			articleId: product.id,
			taxId: product.tax.id,
			taxRate: 19, //TODO static datalar dinamik yapilacak
			statusId: 0, //TODO static datalar dinamik yapilacak
			articleNumber: articlenumber,
			price: product.mainDetail.prices[0].price * 1.19, //TODO static datalar dinamik yapilacak
			quantity: product.quantity,
			articleName: product.name,
			shipped: 0,
			shippedGroup: 0,
			mode: 0,
			esdArticle: 0,
		};
		productList.push(obj);
		const price = priceWithTax(
			product.mainDetail.prices[0].price.toFixed(2),
			product.tax.tax
		);
		total += price * product.quantity;
	});

	//TODO stateId incelenemeli

	const formData = JSON.stringify({
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
		currencyFactor: 1,
		details: productList,
		documents: [],
		billing: selectedBilllingAddress,
		shipping: selectedShippingAddress,
		paymentStatusId: 17,
		orderStatusId: 0,
		deviceType: 'application',
	});
	const response = await Api.post('/orders', formData);
	if (response.data.id > 0) {
		return response.data;
	} else {
		return false;
	}
}

export default {
	orderbyCustomerList,
	orderDetail,
	orderCreate,
};
