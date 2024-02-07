import express from "express";
import { transactionRouter } from "./transaction.js";
import { categoryRouter } from "./category.js";
import { budgetRouter } from "./budget.js";
import { userRouter } from "./users.js";
import { authRouter } from "./auth.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/transactions", auth, transactionRouter);
router.use("/categories", auth, categoryRouter);
router.use("/budgets", auth, budgetRouter);

export { router as appRouter };
