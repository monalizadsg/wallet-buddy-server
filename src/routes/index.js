import express from "express";
import { transactionRouter } from "./transaction.js";
import { categoryRouter } from "./category.js";

const router = express.Router();

router.use("/transaction", transactionRouter);
router.use("/category", categoryRouter);

export { router as appRouter };
