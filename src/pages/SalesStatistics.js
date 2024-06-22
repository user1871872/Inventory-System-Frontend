import React, { useState, useEffect } from 'react';
import {
  fetchSalesStatistics,
  fetchProducts,
  fetchRecentAddedProducts,
  fetchLatestPurchases,
  fetchHighestSaleProducts
} from '../services/api';
import CountUp from 'react-countup';

const SalesStatistics = () => {
  const [statistics, setStatistics] = useState({
    daily_sales: 0,
    weekly_sales: 0,
    monthly_sales: 0,
  });
  const [totalProducts, setTotalProducts] = useState(0);
  const [recentAddedProducts, setRecentAddedProducts] = useState([]);
  const [latestSales, setLatestSales] = useState([]);
  const [highestSaleProducts, setHighestSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          statsResponse,
          productsResponse,
          recentProductsResponse,
          latestSalesResponse,
          highestSalesResponse
        ] = await Promise.all([
          fetchSalesStatistics(),
          fetchProducts(),
          fetchRecentAddedProducts(),
          fetchLatestPurchases(),
          fetchHighestSaleProducts()
        ]);

        console.log('Stats response:', statsResponse); // Check the response structure and data
        console.log('Products response:', productsResponse);
        console.log('Recent products response:', recentProductsResponse);
        console.log('Latest sales response:', latestSalesResponse);
        console.log('Highest sales response:', highestSalesResponse);

        // Update the state with fetched data
        setStatistics(statsResponse.data);
        setTotalProducts(productsResponse.data.length);
        // Map through recentProductsResponse to add a count property
        const recentProductsData = recentProductsResponse.data.map(product => ({
          ...product,
          count: 0 // Initial count for CountUp animation
        }));
        setRecentAddedProducts(recentProductsData);
        setLatestSales(latestSalesResponse.data);
        setHighestSaleProducts(highestSalesResponse.data);
        
        // Update the count for recentAddedProducts after a delay to allow rendering
        setTimeout(() => {
          const updatedRecentProducts = recentProductsData.map(product => ({
            ...product,
            count: product.price // Set count to product price for CountUp animation
          }));
          setRecentAddedProducts(updatedRecentProducts);
        }, 500); // Adjust delay as needed
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on component mount

  if (loading) {
    return <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-gray-800">Sales Statistics Dashboard</h1>
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Daily Sales</h2>
          <p className="text-3xl font-bold text-blue-600">
            <CountUp start={0} end={statistics.daily_sales} duration={2} separator="," /> ₱
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-green-800 mb-2">Weekly Sales</h2>
          <p className="text-3xl font-bold text-green-600">
            <CountUp start={0} end={statistics.weekly_sales} duration={2} separator="," /> ₱
          </p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">Monthly Sales</h2>
          <p className="text-3xl font-bold text-yellow-600">
            <CountUp start={0} end={statistics.monthly_sales} duration={2} separator="," /> ₱
          </p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-purple-800 mb-2">Total Products</h2>
          <p className="text-3xl font-bold text-purple-600">
            <CountUp start={0} end={totalProducts} duration={2} separator="," />
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Recent Added Products</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr className='text-left'>
                <th className="py-2">Name</th>
                <th className="py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {recentAddedProducts.map(product => (
                <tr key={product.id}>
                  <td className="py-2">{product.name}</td>
                  <td className="py-2">
                    <CountUp start={0} end={product.count} duration={2} separator="," /> ₱
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Latest Sales</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr className='text-left'>
                <th className="py-2">Product</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {latestSales.map(sale => (
                <tr key={sale.id}>
                  <td className="py-2">{sale.product_name}</td>
                  <td className="py-2">{sale.quantity}</td>
                  <td className="py-2">₱<CountUp start={0} end={sale.total_amount} duration={2} separator="," /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Highest Sale Products</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr className='text-left'>
                <th className="py-2">Product</th>
                <th className="py-2">Sales</th>
              </tr>
            </thead>
            <tbody>
              {highestSaleProducts.map(product => (
                <tr key={product.id}>
                  <td className="py-2">{product.product__name}</td>
                  <td className="py-2">₱<CountUp start={0} end={product.total_sales} duration={2} separator="," /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesStatistics;
