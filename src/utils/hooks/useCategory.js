import {useQuery} from 'react-query';
import {
  categoryDetail,
  categories,
  categoriesByRecomended,
} from '../actions/categoryactions';

const getCategoryByCategoryId = async (categoryId) => {
  const data = await categoryDetail(categoryId);
  return data;
};

export function useCategoryByCategoryId(categoryId, options) {
  return useQuery(
    ['categoryData', categoryId],
    () => getCategoryByCategoryId(categoryId),
    options,
  );
}

const getAllCategories = async () => {
  const data = await categories();
  return data;
};

export function useAllCategories(mainCategory) {
  return useQuery(['allCategoriesData', mainCategory], getAllCategories);
}

const getRecomendedCategories = async (collection) => {
  const data = await categoriesByRecomended();
  return data;
};

export function useRecomendedCategories(collection) {
  return useQuery('recomendedCategories', getRecomendedCategories);
}
