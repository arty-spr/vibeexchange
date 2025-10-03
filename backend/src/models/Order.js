
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['BUY', 'SELL'],
    required: true
  },
  orderType: {
    type: String,
    enum: ['MARKET', 'LIMIT'],
    default: 'MARKET'
  },
  symbol: {
    type: String,
    required: true,
    uppercase: true
  },
  name: String,
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  limitPrice: {
    type: Number,
    required: function() {
      return this.orderType === 'LIMIT';
    },
    min: 0
  },
  status: {
    type: String,
    enum: ['PENDING', 'FILLED', 'CANCELLED', 'EXPIRED'],
    default: 'PENDING'
  },
  filledAmount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: function() {
      // По умолчанию ордер истекает через 30 дней
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }
  },
  filledAt: Date
}, {
  timestamps: true
});

// Index для быстрого поиска активных ордеров
orderSchema.index({ userId: 1, status: 1 });
orderSchema.index({ symbol: 1, status: 1, orderType: 1 });

export default mongoose.model('Order', orderSchema);