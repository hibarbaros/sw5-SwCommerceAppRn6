import {useQuery} from 'react-query';
import {shopData} from '../actions/appactions';

const getShopPagesByShopId = async (_, shopId) => {
	const data = await shopData(shopId);
	return data.shopPages;
};

export function useShopPagesByShopId(shopId) {
	return useQuery(['shopPagesData', shopId], getShopPagesByShopId);
}

const getShopByShopId = async (_, shopId) => {
	const data = await shopData(shopId);
	return data;
};

export function useShopByShopId(shopId) {
	return useQuery(['shopPagesData', shopId], getShopByShopId);
}
