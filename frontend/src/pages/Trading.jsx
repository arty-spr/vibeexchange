import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { marketAPI, tradingAPI } from '../services/api';
import { TrendingUp, TrendingDown } from 'lucide-react';
import TradingViewChart from '../components/TradingViewChart';
import TutorialTooltip from '../components/TutorialTooltip';

const Trading = () => {
  const { user, refreshUser } = useAuth();
  const [prices, setPrices] = useState({});
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [tradeType, setTradeType] = useState('BUY');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

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
    }
  };

  const currentPrice = prices[selectedCrypto]?.price || 0;
  const totalValue = amount * currentPrice;
  const fee = totalValue * 0.001;
  const totalWithFee = tradeType === 'BUY' ? totalValue + fee : totalValue - fee;

  const userAsset = user?.portfolio?.find(p => p.symbol === selectedCrypto);
  const availableAmount = userAsset?.amount || 0;

  const handleTrade = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!amount || parseFloat(amount) <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid amount' });
      return;
    }

    if (tradeType === 'BUY' && totalWithFee > user.balance) {
      setMessage({ type: 'error', text: 'Insufficient balance' });
      return;
    }

    if (tradeType === 'SELL' && parseFloat(amount) > availableAmount) {
      setMessage({ type: 'error', text: 'Insufficient cryptocurrency amount' });
      return;
    }

    setLoading(true);

    try {
      const tradeData = {
        symbol: selectedCrypto,
        amount: parseFloat(amount)
      };

      const response = tradeType === 'BUY'
        ? await tradingAPI.buy(tradeData)
        : await tradingAPI.sell(tradeData);

      if (response.data.success) {
        setMessage({ 
          type: 'success', 
          text: `Successfully ${tradeType === 'BUY' ? 'bought' : 'sold'} ${amount} ${selectedCrypto}!` 
        });
        setAmount('');
        await refreshUser();
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Transaction failed' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative inline-block mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Trading</h1>
        <TutorialTooltip
          stepId="trading-intro"
          title="Welcome to Trading!"
          description="This is where you can buy and sell cryptocurrencies. Start by selecting a cryptocurrency from the market prices list, then choose whether to buy or sell."
          position="bottom"
        />
      </div>

      <div className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="relative inline-block mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {prices[selectedCrypto]?.name} Chart
            </h2>
            <TutorialTooltip
              stepId="price-chart"
              title="Price Chart"
              description="This is a live price chart from TradingView. Use it to analyze price movements and trends before making trading decisions."
              position="bottom"
            />
          </div>
          <TradingViewChart symbol={selectedCrypto} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="relative inline-block mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Market Prices</h2>
            <TutorialTooltip
              stepId="market-prices"
              title="Market Prices"
              description="Here you can see current prices for all available cryptocurrencies. Click on any crypto to select it for trading."
              position="bottom"
            />
          </div>
          <div className="space-y-3">
            {Object.values(prices).map((crypto) => (
              <button
                key={crypto.symbol}
                onClick={() => setSelectedCrypto(crypto.symbol)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedCrypto === crypto.symbol
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{crypto.symbol}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{crypto.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      ${crypto.price.toLocaleString()}
                    </p>
                    <p className={`text-sm flex items-center justify-end ${
                      crypto.change24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {crypto.change24h >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Trade {prices[selectedCrypto]?.name}
          </h2>

          <div className="relative flex gap-2 mb-6">
            <button
              onClick={() => setTradeType('BUY')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                tradeType === 'BUY'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setTradeType('SELL')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                tradeType === 'SELL'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Sell
            </button>
            <TutorialTooltip
              stepId="buy-sell-buttons"
              title="Buy or Sell"
              description="Click 'Buy' to purchase cryptocurrency with your USD balance, or 'Sell' to sell your cryptocurrency holdings for USD."
              position="bottom"
            />
          </div>

          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-800'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleTrade}>
            <div className="mb-6 relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount ({selectedCrypto})
              </label>
              <input
                type="number"
                step="0.00000001"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="0.00"
                required
              />
              {tradeType === 'SELL' && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Available: {availableAmount.toFixed(8)} {selectedCrypto}
                </p>
              )}
              <TutorialTooltip
                stepId="amount-input"
                title="Enter Amount"
                description="Enter how much cryptocurrency you want to buy or sell. Make sure you have enough balance."
                position="top"
              />
            </div>

            <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4 mb-6 space-y-2 border border-gray-200 dark:border-gray-700 relative">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Price per {selectedCrypto}:</span>
                <span className="font-medium text-gray-900 dark:text-white">${currentPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span className="font-medium text-gray-900 dark:text-white">${totalValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Fee (0.1%):</span>
                <span className="font-medium text-gray-900 dark:text-white">${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold border-t border-gray-300 dark:border-gray-600 pt-2 mt-2">
                <span className="text-gray-900 dark:text-white">Total:</span>
                <span className="text-gray-900 dark:text-white">${totalWithFee.toFixed(2)}</span>
              </div>
              <TutorialTooltip
                stepId="trade-summary"
                title="Trade Summary"
                description="This shows a breakdown of your trade. The fee is 0.1% of the total value. Review carefully before confirming."
                position="top"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !amount}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                tradeType === 'BUY'
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-500 hover:bg-red-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? 'Processing...' : `${tradeType} ${selectedCrypto}`}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Available Balance:</span>
              <span className="font-medium text-gray-900 dark:text-white">${user?.balance?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trading;