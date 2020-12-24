import {useQuery} from 'react-query';
import {orderbyCustomerList, orderDetail} from '../actions/orderactions';

const getOrderByOrderId = async (_, orderId) => {
	const data = await orderDetail(orderId);
	return data;
};

export function useOrderByOrderId(orderId) {
	return useQuery([`orderDetail-${orderId}`, orderId], getOrderByOrderId);
}

const getOrderByCustomerId = async (_, userId) => {
	const data = await orderbyCustomerList(userId);
	return data;
};

export function useOrdersByCustomerId(userId) {
	return useQuery([`userOrdersData-${userId}`, userId], getOrderByCustomerId);
}
