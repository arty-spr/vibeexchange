import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { marketAPI, tradingAPI } from '../services/api';
import { TrendingUp, TrendingDown } from 'lucide-react';

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
  const fee = totalValue * 0.001; // 0.1% fee
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Trading</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Prices */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Market Prices</h2>
          <div className="space-y-3">
            {Object.values(prices).map((crypto) => (
              <button
                key={crypto.symbol}
                onClick={() => setSelectedCrypto(crypto.symbol)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedCrypto === crypto.symbol
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{crypto.symbol}</p>
                    <p className="text-sm text-gray-500">{crypto.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ${crypto.price.toLocaleString()}
                    </p>
                    <p className={`text-sm flex items-center justify-end ${
                      crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'
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

        {/* Trading Form */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Trade {prices[selectedCrypto]?.name}
          </h2>

          {/* Trade Type Selector */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setTradeType('BUY')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                tradeType === 'BUY'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setTradeType('SELL')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                tradeType === 'SELL'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sell
            </button>
          </div>

          {/* Message */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleTrade}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount ({selectedCrypto})
              </label>
              <input
                type="number"
                step="0.00000001"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="0.00"
                required
              />
              {tradeType === 'SELL' && (
                <p className="text-sm text-gray-500 mt-1">
                  Available: {availableAmount.toFixed(8)} {selectedCrypto}
                </p>
              )}
            </div>

            {/* Trade Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Price per {selectedCrypto}:</span>
                <span className="font-medium">${currentPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${totalValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fee (0.1%):</span>
                <span className="font-medium">${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold border-t border-gray-300 pt-2 mt-2">
                <span>Total:</span>
                <span>${totalWithFee.toFixed(2)}</span>
              </div>
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

          {/* Account Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Available Balance:</span>
              <span className="font-medium">${user?.balance?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trading;