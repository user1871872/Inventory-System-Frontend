import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

export const fetchProducts = () => {
  return axios.get(`${API_URL}products/`);
};

export const addProduct = (product) => {
  return axios.post(`${API_URL}products/`, product);
};

export const fetchSalesStatistics = () => {
  return axios.get(`${API_URL}sales-statistics/`);
};
export const purchaseProduct = (purchaseData) => {
  return axios.post(`${API_URL}purchase/`, purchaseData);
};

export const listPurchases = () => {
  return axios.get(`${API_URL}purchases/`);
};
