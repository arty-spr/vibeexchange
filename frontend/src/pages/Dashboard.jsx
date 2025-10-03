import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { marketAPI } from '../services/api';
import { TrendingUp, TrendingDown, Wallet, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchPrices = async () => {
    try {
      const response = await marketAPI.getAllPrices();
      setPrices(response.data.data.prices);
    } catch (error) {
      console.error('Error fetching prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePortfolioValue = () => {
    if (!user?.portfolio || !prices) return 0;
    
    return user.portfolio.reduce((total, asset) => {
      const currentPrice = prices[asset.symbol]?.price || 0;
      return total + (asset.amount * currentPrice);
    }, 0);
  };

  const portfolioValue = calculatePortfolioValue();
  const totalValue = (user?.balance || 0) + portfolioValue;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back, {user?.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cash Balance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                ${user?.balance?.toFixed(2)}
              </p>
            </div>
            <Wallet className="h-12 w-12 text-green-500 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Portfolio Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                ${portfolioValue.toFixed(2)}
              </p>
            </div>
            <Activity className="h-12 w-12 text-blue-500 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                ${totalValue.toFixed(2)}
              </p>
            </div>
            <TrendingUp className="h-12 w-12 text-purple-500 dark:text-purple-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-8 border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Market Overview</h2>
        </div>
        <div className="p-6">
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Loading prices...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(prices).map((crypto) => (
                <div 
                  key={crypto.symbol} 
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all bg-white dark:bg-gray-900"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{crypto.symbol}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{crypto.name}</p>
                    </div>
                    {crypto.change24h >= 0 ? (
                      <TrendingUp className="h-6 w-6 text-green-500 dark:text-green-400" />
                    ) : (
                      <TrendingDown className="h-6 w-6 text-red-500 dark:text-red-400" />
                    )}
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className={`text-sm font-medium ${crypto.change24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quick Actions</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/trading"
            className="flex items-center justify-center px-6 py-4 border-2 border-primary-600 dark:border-primary-500 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors font-medium"
          >
            Start Trading
          </Link>
          <Link
            to="/portfolio"
            className="flex items-center justify-center px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;