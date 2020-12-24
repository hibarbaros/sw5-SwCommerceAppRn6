import {useQuery} from 'react-query';
import {
	categoryDetail,
	categories,
	categoriesByRecomended,
} from '../actions/categoryactions';

const getCategoryByCategoryId = async (_, categoryId) => {
	const data = await categoryDetail(categoryId);
	return data;
};

export function useCategoryByCategoryId(categoryId, options) {
	return useQuery(
		[`categoryData-${categoryId}`, categoryId],
		getCategoryByCategoryId,
		options
	);
}

const getAllCategories = async (_) => {
	const data = await categories();
	return data;
};

export function useAllCategories() {
	return useQuery(['allCategoriesData'], getAllCategories);
}

const getAllReacomendedCategories = async (_) => {
	const data = await categoriesByRecomended();
	return data;
};

export function useAllReacomendedCategories() {
	return useQuery(['allReacomendedCategories'], getAllReacomendedCategories);
}
