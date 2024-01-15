import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  amountLimit: {
    type: Number,
    required: true,
  },
  periodType: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export const BudgetModel = mongoose.model("Budget", BudgetSchema);
