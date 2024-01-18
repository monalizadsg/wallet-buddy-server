import express from "express";
import { transactionRouter } from "./transaction.js";
import { categoryRouter } from "./category.js";
import { budgetRouter } from "./budget.js";
import { userRouter } from "./users.js";

const router = express.Router();

router.use("/transaction", transactionRouter);
router.use("/category", categoryRouter);
router.use("/budget", budgetRouter);
router.use("/user", userRouter);

export { router as appRouter };