import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { marketAPI } from '../services/api';
import { TrendingUp, TrendingDown, PieChart } from 'lucide-react';

const Portfolio = () => {
  const { user } = useAuth();
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrices();
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

  const calculatePortfolioData = () => {
    if (!user?.portfolio || !prices) return [];

    return user.portfolio.map(asset => {
      const currentPrice = prices[asset.symbol]?.price || 0;
      const currentValue = asset.amount * currentPrice;
      const investedValue = asset.amount * asset.averagePrice;
      const profitLoss = currentValue - investedValue;
      const profitLossPercent = investedValue > 0 
        ? ((currentValue - investedValue) / investedValue) * 100 
        : 0;

      return {
        ...asset,
        currentPrice,
        currentValue,
        investedValue,
        profitLoss,
        profitLossPercent
      };
    });
  };

  const portfolioData = calculatePortfolioData();
  const totalPortfolioValue = portfolioData.reduce((sum, asset) => sum + asset.currentValue, 0);
  const totalInvested = portfolioData.reduce((sum, asset) => sum + asset.investedValue, 0);
  const totalProfitLoss = totalPortfolioValue - totalInvested;
  const totalProfitLossPercent = totalInvested > 0 
    ? ((totalPortfolioValue - totalInvested) / totalInvested) * 100 
    : 0;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-500 dark:text-gray-400">Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Portfolio</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Portfolio Value</p>
            <PieChart className="h-5 w-5 text-primary-500 dark:text-primary-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ${totalPortfolioValue.toFixed(2)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Invested</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ${totalInvested.toFixed(2)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Profit/Loss</p>
          <p className={`text-3xl font-bold ${totalProfitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {totalProfitLoss >= 0 ? '+' : ''}${totalProfitLoss.toFixed(2)}
          </p>
          <p className={`text-sm ${totalProfitLossPercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {totalProfitLossPercent >= 0 ? '+' : ''}{totalProfitLossPercent.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Holdings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Holdings</h2>
        </div>

        {portfolioData.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">You don't have any assets yet</p>
            <a 
              href="/trading" 
              className="inline-block px-6 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
            >
              Start Trading
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Avg. Buy Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Current Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Current Value
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Profit/Loss
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {portfolioData.map((asset) => (
                  <tr key={asset.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{asset.symbol}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{asset.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                      {asset.amount.toFixed(8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                      ${asset.averagePrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                      ${asset.currentPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900 dark:text-white">
                      ${asset.currentValue.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className={`flex flex-col items-end ${
                        asset.profitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        <div className="flex items-center">
                          {asset.profitLoss >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          <span className="font-medium">
                            {asset.profitLoss >= 0 ? '+' : ''}${asset.profitLoss.toFixed(2)}
                          </span>
                        </div>
                        <span className="text-sm">
                          {asset.profitLossPercent >= 0 ? '+' : ''}{asset.profitLossPercent.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Account Balance */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Account Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Cash Balance:</span>
            <span className="font-medium text-gray-900 dark:text-white">${user?.balance?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Total Account Value:</span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              ${((user?.balance || 0) + totalPortfolioValue).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;