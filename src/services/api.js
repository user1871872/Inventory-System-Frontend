import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

export const fetchProducts = () => {
  return axios.get(`${API_URL}products/`);
};

export const addProduct = (product) => {
  return axios.post(`${API_URL}products/`, product);
};

export const updateProduct = (productId, updatedProduct) => {
  return axios.put(`${API_URL}products/${productId}/`, updatedProduct);
};

export const deleteProduct = (productId) => {
  return axios.delete(`${API_URL}products/${productId}/`);
};

export const fetchSalesStatistics = () => {
  return axios.get(`${API_URL}sales-statistics/sales-statistics/`);
};

export const saleRecords = () => {
  return axios.get(`${API_URL}sale-records/`);
};

export const purchaseProduct = (purchaseData) => {
  return axios.post(`${API_URL}purchase/`, purchaseData);
};

export const listPurchases = () => {
  return axios.get(`${API_URL}purchases/`);
};

export const fetchUsers = () => {
  return axios.get(`${API_URL}users/`);
};
// New API functions
export const fetchRecentAddedProducts = () => {
  return axios.get(`${API_URL}recent-added-products/`);
};

export const fetchLatestPurchases = () => {
  return axios.get(`${API_URL}latest-purchases/`);
};

export const fetchHighestSaleProducts = () => {
  return axios.get(`${API_URL}highest-sale-products/`);
};
