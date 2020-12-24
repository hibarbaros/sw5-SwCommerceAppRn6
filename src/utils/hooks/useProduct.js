import {useQuery} from 'react-query';
import lodash from 'lodash';

import {
  productAttributesOptions,
  productAttributesOptionsFilterByOptionId,
  articleDetail,
  articlesByCategoryId,
  articlesSearch,
  attributesOptions,
  articlesByAttributes,
} from '../actions/articleactions';

const getSearchByString = async (string) => {
  const data = await articlesSearch(string);
  return data;
};

export function useSearchByString(string) {
  return useQuery(['productSearch', string], () => getSearchByString(string));
}

const getProductByProductId = async (articleId) => {
  const data = await articleDetail(articleId);
  return data;
};

export function useProductByProductId(articleId) {
  return useQuery(['productDetail', articleId], () =>
    getProductByProductId(articleId),
  );
}

const getProducstByCategoryId = async (categoryId) => {
  const data = await articlesByCategoryId(categoryId);
  const uniqueArticles = lodash.uniqBy(data, 'articleID');
  return uniqueArticles;
};

export function useProducstByCategoryId(categoryId) {
  return useQuery(['categoryProducts', categoryId], () =>
    getProducstByCategoryId(categoryId),
  );
}

const getProductAttributesOptions = async () => {
  const data = await productAttributesOptions();
  return data;
};

export function useProductAttributesOptions() {
  return useQuery(['productAttributesOptions'], getProductAttributesOptions);
}

const getAttributesOptions = async (_) => {
  const data = await attributesOptions();
  return data;
};

export function useAttributesOptions() {
  return useQuery(['attributesOptions'], getAttributesOptions);
}

const getProductAttributesOptionsFilterByOptionId = async (optionId) => {
  const data = await productAttributesOptionsFilterByOptionId(optionId);
  return data;
};

export function useProductAttributesOptionsFilterByOptionId(optionId) {
  return useQuery(['productAttributesOptions', optionId], () =>
    getProductAttributesOptionsFilterByOptionId(optionId),
  );
}

const getProductCustomAttr = async (attrId) => {
  const data = await articlesByAttributes(attrId);
  return data;
};

export function useProductCustomAttr(attrId) {
  return useQuery(['productCustomAttr', attrId], () =>
    getProductCustomAttr(attrId),
  );
}
