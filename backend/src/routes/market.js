import express from 'express';
import { 
  getAllPrices, 
  getPrice, 
  getHistoricalData, 
  getSupportedCryptos 
} from '../controllers/marketController.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/prices', getAllPrices);
router.get('/prices/:symbol', getPrice);
router.get('/history/:symbol', getHistoricalData);
router.get('/supported', getSupportedCryptos);

export { router as default };