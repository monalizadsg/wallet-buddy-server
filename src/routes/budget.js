import express from "express";
import bodyParser from "body-parser";

import { BudgetModel } from "../model/Budget.js";

const router = express.Router();

router.use(bodyParser.json());

// create new budget item
router.post("/", async (req, res) => {
  const { amountLimit, periodType, categoryId, userId } = req.body;

  try {
    if (!amountLimit || !periodType || !categoryId) {
      return res
        .status(400)
        .json({ error: "Amount Limit, period, category are required" });
    }

    // Check if category already exists
    const existingBudget = await BudgetModel.findOne({ categoryId });

    if (existingBudget) {
      return res
        .status(400)
        .json({ error: "Budget for this category already exists." });
    }

    const newBudget = new BudgetModel({
      amountLimit,
      periodType,
      categoryId,
      userId,
    });

    const budget = await newBudget.save();
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// get all budgets
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await BudgetModel.find({ userId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update budget
router.put("/", async (req, res) => {
  const { id, amountLimit, periodType, categoryId } = req.body;

  try {
    const result = await BudgetModel.findByIdAndUpdate(
      id,
      { amountLimit, periodType, categoryId },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete budget
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await BudgetModel.findByIdAndRemove(id);
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

export { router as budgetRouter };
