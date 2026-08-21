import mongoose from 'mongoose';

const TradeSchema = new mongoose.Schema(
  {
    // Ownership
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // Trade Information
    instrument: {
      type: String,
      trim: true,
      maxlength: 20,
      required: true, // e.g. XAUUSD, EURUSD
    },
    market: {
      type: String,
      trim: true,
    },
    timeframe: {
      type: String,
      trim: true,
    },
    session: {
      type: String,
      trim: true,
    },
    direction: {
      type: String,
      required: true,
      enum: ['long', 'short'],
    },
    setup: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    // Execution & Mechanics
    entryPrice: {
      type: Number,
      required: true,
      min: [0.00000001, 'Entry price must be strictly positive'],
    },
    stopLoss: {
      type: Number,
      min: [0, 'Stop loss cannot be negative'], // Can technically be 0 for some assets
    },
    target: {
      type: Number,
      min: [0, 'Target cannot be negative'],
    },

    // Risk Configuration (Per-Trade Independently)
    riskPercentage: {
      type: Number,
      required: true,
      min: [0.001, 'Risk percentage must be greater than zero'],
      max: [100, 'Risk percentage cannot exceed 100'],
    },
    riskRewardRatio: {
      type: Number,
      required: true,
      min: [0.01, 'Risk Reward Ratio must be strictly positive'],
    },

    // Status and Results
    tradeDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open',
    },
    result: {
      type: String,
      enum: ['win', 'loss', 'breakeven', 'pending'],
      default: 'pending',
    },
    pnl: {
      type: Number, // Derived financial field, persisted as historical snapshot
    },
    rMultiple: {
      type: Number, // Derived financial field, persisted as historical snapshot
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Index to quickly load a user's recent journal history
TradeSchema.index({ userId: 1, tradeDate: -1 });
// Optional but likely useful future index for dashboard filtering
TradeSchema.index({ userId: 1, status: 1 });

// Prevent hot-reload recompilation errors in Next.js
export const Trade = mongoose.models.Trade || mongoose.model('Trade', TradeSchema);
