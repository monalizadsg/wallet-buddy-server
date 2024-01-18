import express from "express";
import bodyParser from "body-parser";

import { TransactionModel } from "../model/Transaction.js";

const router = express.Router();

router.use(bodyParser.json());

// create new transaction item
router.post("/", async (req, res) => {
  const { amount, description, categoryId, date, userId } = req.body;

  try {
    if (!amount || !description || !categoryId) {
      return res
        .status(400)
        .json({ error: "Amount, description, and category are required" });
    }

    const newTransaction = new TransactionModel({
      amount,
      description,
      categoryId,
      date,
      userId,
    });

    const transaction = await newTransaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// get all transactions
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await TransactionModel.find({ userId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update transaction
router.put("/", async (req, res) => {
  const { id, amount, description, categoryId, date } = req.body;

  try {
    const result = await TransactionModel.findByIdAndUpdate(
      id,
      { amount, description, categoryId, date },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete transaction
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await TransactionModel.findByIdAndRemove(id);
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

export { router as transactionRouter };
