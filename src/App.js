import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/Home';
import Dashboard from './pages/SalesStatistics';
import ProductsList from './pages/ProductsList';
import RecentPurchase from './pages/RecentPurchase';
import Profile from './pages/Profile';
import Logout from './pages/Logout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="recent-purchase" element={<RecentPurchase />} />
          <Route path="profile" element={<Profile />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
