import express from 'express';
import { body } from 'express-validator';
import { buyCrypto, sellCrypto, getTransactions } from '../controllers/tradingController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const validateTrade = [
  body('symbol').trim().notEmpty().toUpperCase(),
  body('amount').isFloat({ gt: 0 })
];

// All trading routes require authentication
router.use(authenticate);

// Routes
router.post('/buy', validateTrade, buyCrypto);
router.post('/sell', validateTrade, sellCrypto);
router.get('/transactions', getTransactions);

export { router as default };