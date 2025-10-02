import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import cryptoService from '../services/cryptoService.js';

const TRADING_FEE_PERCENT = 0.1; // 0.1% fee

// Buy cryptocurrency
export const buyCrypto = async (req, res) => {
  try {
    const { symbol, amount } = req.body;
    const userId = req.userId;

    // Validate input
    if (!symbol || !amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid symbol or amount'
      });
    }

    // Get current price
    const priceData = await cryptoService.getPrice(symbol);
    if (!priceData) {
      return res.status(400).json({
        success: false,
        message: 'Cryptocurrency not supported'
      });
    }

    const price = priceData.price;
    const totalCost = amount * price;
    const fee = totalCost * (TRADING_FEE_PERCENT / 100);
    const totalWithFee = totalCost + fee;

    // Get user
    const user = await User.findById(userId);
    
    // Check if user has enough balance
    if (user.balance < totalWithFee) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance'
      });
    }

    // Update user balance
    user.balance -= totalWithFee;

    // Update portfolio
    const existingAsset = user.portfolio.find(p => p.symbol === symbol.toUpperCase());
    
    if (existingAsset) {
      // Update existing asset - calculate new average price
      const totalAmount = existingAsset.amount + amount;
      const totalValue = (existingAsset.amount * existingAsset.averagePrice) + (amount * price);
      existingAsset.averagePrice = totalValue / totalAmount;
      existingAsset.amount = totalAmount;
    } else {
      // Add new asset
      user.portfolio.push({
        symbol: symbol.toUpperCase(),
        name: priceData.name,
        amount: amount,
        averagePrice: price
      });
    }

    await user.save();

    // Create transaction record
    const transaction = new Transaction({
      userId,
      type: 'BUY',
      symbol: symbol.toUpperCase(),
      name: priceData.name,
      amount,
      price,
      totalValue: totalCost,
      fee,
      status: 'COMPLETED'
    });

    await transaction.save();

    res.json({
      success: true,
      message: 'Purchase successful',
      data: {
        transaction: transaction.toObject(),
        user: user.toJSON()
      }
    });
  } catch (error) {
    console.error('Buy crypto error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing purchase',
      error: error.message
    });
  }
};

// Sell cryptocurrency
export const sellCrypto = async (req, res) => {
  try {
    const { symbol, amount } = req.body;
    const userId = req.userId;

    // Validate input
    if (!symbol || !amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid symbol or amount'
      });
    }

    // Get current price
    const priceData = await cryptoService.getPrice(symbol);
    if (!priceData) {
      return res.status(400).json({
        success: false,
        message: 'Cryptocurrency not supported'
      });
    }

    const price = priceData.price;
    const totalValue = amount * price;
    const fee = totalValue * (TRADING_FEE_PERCENT / 100);
    const totalAfterFee = totalValue - fee;

    // Get user
    const user = await User.findById(userId);
    
    // Check if user has this asset
    const asset = user.portfolio.find(p => p.symbol === symbol.toUpperCase());
    
    if (!asset) {
      return res.status(400).json({
        success: false,
        message: 'You do not own this cryptocurrency'
      });
    }

    // Check if user has enough amount
    if (asset.amount < amount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient cryptocurrency amount'
      });
    }

    // Update portfolio
    asset.amount -= amount;
    
    // Remove asset if amount is 0
    if (asset.amount === 0) {
      user.portfolio = user.portfolio.filter(p => p.symbol !== symbol.toUpperCase());
    }

    // Update balance
    user.balance += totalAfterFee;

    await user.save();

    // Create transaction record
    const transaction = new Transaction({
      userId,
      type: 'SELL',
      symbol: symbol.toUpperCase(),
      name: priceData.name,
      amount,
      price,
      totalValue,
      fee,
      status: 'COMPLETED'
    });

    await transaction.save();

    res.json({
      success: true,
      message: 'Sale successful',
      data: {
        transaction: transaction.toObject(),
        user: user.toJSON()
      }
    });
  } catch (error) {
    console.error('Sell crypto error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing sale',
      error: error.message
    });
  }
};

// Get user transactions
export const getTransactions = async (req, res) => {
  try {
    const userId = req.userId;
    const { limit = 50, skip = 0 } = req.query;

    const transactions = await Transaction.find({ userId })
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await Transaction.countDocuments({ userId });

    res.json({
      success: true,
      data: {
        transactions,
        total,
        limit: parseInt(limit),
        skip: parseInt(skip)
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching transactions',
      error: error.message
    });
  }
};