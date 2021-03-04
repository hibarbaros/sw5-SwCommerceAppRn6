import Api from '../api';
import _ from 'lodash';

export async function articleDetail(articleId) {
  const response = await Api.get(`/ConnectorArticles/${articleId}`);
  if (response.data) {
    return response.data;
  } else {
    return false;
  }
}

export async function articleDetailByArticleNumber(articleNumber) {
  const response = await Api.get(
    `/ConnectorArticles/${articleNumber}?useNumberAsId=true`,
  );
  if (response.data) {
    return response.data;
  } else {
    return false;
  }
}

export async function articles() {
  const response = await Api.get('/ConnectorArticles/');
  if (response.data) {
    const active = _.filter(response.data, {active: true});
    return active;
  }
}

export async function articlesSearch(string) {
  const response = await Api.get(
    `/ConnectorArticles?filter[0][property]=name&filter[0][value]=${string}%`,
  );
  if (response.data) {
    const active = _.filter(response.data, {active: true});
    return active;
  }
}

export async function articlesByCategory(categoryId) {
  const response = await Api.get(
    `/ConnectorArticles?filter[0][property]=categories.id&filter[0][value]=${categoryId}`,
  );
  if (response.data) {
    const active = _.filter(response.data, {active: true});
    return active;
  }
}

export async function articlesByAttributes(attrId) {
  const response = await Api.get(
    `ConnectorArticles?filter[0][property]=mainDetail&filter[0][property]=attribute.${attrId}&filter[0][value]=1`,
  );
  if (response.data) {
    const active = _.filter(response.data, {active: true});
    return active;
  }
}

export async function articlesByCategoryId(categoryId) {
  const response = await Api.get(`/ConnectorCategories/${categoryId}`);
  if (response.data) {
    const productsData = response.data;
    return productsData.products;
  }
}

export async function propertyGroupList() {
  const response = await Api.get('/propertyGroups/');
  if (response.data) {
    return response.data;
  }
}

export async function propertyGroupDetail(propertyGroupId) {
  const response = await Api.get(`/propertyGroups/${propertyGroupId}`);
  if (response.data) {
    return response.data;
  }
}

export async function productAttributesOptions() {
  const response = await Api.get('/ConnectorProductAttributesOptions/');
  if (response.data) {
    return response.data;
  }
}

export async function attributesOptions() {
  const response = await Api.get('/ConnectorProductAttributes/');
  if (response.data) {
    return response.data;
  }
}

export async function productAttributesOptionsFilterByOptionId(optionId) {
  const response = await Api.get(
    `/ConnectorProductAttributesOptions?filter[0][property]=optionId&filter[0][value]=${optionId}`,
  );
  if (response.data) {
    return response.data;
  }
}

export default {
  articleDetail,
  articles,
};
