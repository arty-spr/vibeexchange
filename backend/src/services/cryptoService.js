import axios from 'axios';

const COINGECKO_API = process.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3';

// Supported cryptocurrencies
export const SUPPORTED_CRYPTOS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'tether', symbol: 'USDT', name: 'Tether' },
  { id: 'binancecoin', symbol: 'BNB', name: 'Binance Coin' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'ripple', symbol: 'XRP', name: 'Ripple' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'polygon', symbol: 'MATIC', name: 'Polygon' }
];

// Cache for prices (to avoid rate limiting)
let priceCache = {};
let lastFetch = 0;
const CACHE_DURATION = 30000; // 30 seconds

class CryptoService {
  // Get current prices for all supported cryptos
  async getAllPrices() {
    const now = Date.now();
    
    // Return cached data if still valid
    if (now - lastFetch < CACHE_DURATION && Object.keys(priceCache).length > 0) {
      return priceCache;
    }

    try {
      const ids = SUPPORTED_CRYPTOS.map(c => c.id).join(',');
      const response = await axios.get(`${COINGECKO_API}/simple/price`, {
        params: {
          ids: ids,
          vs_currencies: 'usd',
          include_24hr_change: true,
          include_24hr_vol: true
        }
      });

      // Transform data to our format
      const prices = {};
      SUPPORTED_CRYPTOS.forEach(crypto => {
        const data = response.data[crypto.id];
        if (data) {
          prices[crypto.symbol] = {
            symbol: crypto.symbol,
            name: crypto.name,
            price: data.usd,
            change24h: data.usd_24h_change || 0,
            volume24h: data.usd_24h_vol || 0
          };
        }
      });

      priceCache = prices;
      lastFetch = now;
      
      return prices;
    } catch (error) {
      console.error('Error fetching prices:', error.message);
      
      // Return cached data if available, even if expired
      if (Object.keys(priceCache).length > 0) {
        return priceCache;
      }
      
      throw new Error('Failed to fetch cryptocurrency prices');
    }
  }

  // Get price for specific crypto
  async getPrice(symbol) {
    const prices = await this.getAllPrices();
    return prices[symbol.toUpperCase()];
  }

  // Get historical data for chart
  async getHistoricalData(symbol, days = 7) {
    try {
      const crypto = SUPPORTED_CRYPTOS.find(c => c.symbol === symbol.toUpperCase());
      if (!crypto) {
        throw new Error('Cryptocurrency not supported');
      }

      const response = await axios.get(`${COINGECKO_API}/coins/${crypto.id}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: days,
          interval: days === 1 ? 'hourly' : 'daily'
        }
      });

      return response.data.prices.map(([timestamp, price]) => ({
        timestamp,
        price
      }));
    } catch (error) {
      console.error('Error fetching historical data:', error.message);
      throw new Error('Failed to fetch historical data');
    }
  }
}

export default new CryptoService();