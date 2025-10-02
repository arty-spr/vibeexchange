import cryptoService, { SUPPORTED_CRYPTOS } from '../services/cryptoService.js';

// Get all cryptocurrency prices
export const getAllPrices = async (req, res) => {
  try {
    const prices = await cryptoService.getAllPrices();
    
    res.json({
      success: true,
      data: { prices }
    });
  } catch (error) {
    console.error('Get all prices error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching prices',
      error: error.message
    });
  }
};

// Get specific cryptocurrency price
export const getPrice = async (req, res) => {
  try {
    const { symbol } = req.params;
    
    const priceData = await cryptoService.getPrice(symbol);
    
    if (!priceData) {
      return res.status(404).json({
        success: false,
        message: 'Cryptocurrency not found'
      });
    }
    
    res.json({
      success: true,
      data: { price: priceData }
    });
  } catch (error) {
    console.error('Get price error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching price',
      error: error.message
    });
  }
};

// Get historical data for charts
export const getHistoricalData = async (req, res) => {
  try {
    const { symbol } = req.params;
    const { days = 7 } = req.query;
    
    const data = await cryptoService.getHistoricalData(symbol, parseInt(days));
    
    res.json({
      success: true,
      data: { 
        symbol: symbol.toUpperCase(),
        history: data 
      }
    });
  } catch (error) {
    console.error('Get historical data error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching historical data',
      error: error.message
    });
  }
};

// Get list of supported cryptocurrencies
export const getSupportedCryptos = async (req, res) => {
  try {
    res.json({
      success: true,
      data: { 
        cryptocurrencies: SUPPORTED_CRYPTOS 
      }
    });
  } catch (error) {
    console.error('Get supported cryptos error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching supported cryptocurrencies',
      error: error.message
    });
  }
};