import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/Home';
import Dashboard from './pages/SalesStatistics';
import ProductsList from './pages/ProductsList';
import AddProduct from './pages/AddProduct';
import ProductPurchase from './pages/ProductPurchase';
import RecentPurchase from './pages/RecentPurchase';
import SaleRecord from './pages/SaleRecord';
import Profile from './pages/Profile';
import Login from './pages/auth/login'
import Logout from './pages/auth/Logout';

const App = () => {
  return (
    <Router>
    <ToastContainer />
      <Routes>
      <Route path="" element={<Home />} />
      <Route path="Login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products-purchase" element={<ProductPurchase />} />
          <Route path="recent-purchase" element={<RecentPurchase />} />
          <Route path="sale-records" element={<SaleRecord />} />
          <Route path="profile" element={<Profile />} />
          <Route path="logout" element={<Logout />} />
          </Route>
      </Routes>
    </Router>
  );
};

export default App;
