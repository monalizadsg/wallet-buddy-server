import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const TransactionModel = mongoose.model(
  "Transaction",
  TransactionSchema
);
