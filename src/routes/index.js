import express from "express";
import { transactionRouter } from "./transaction.js";
import { categoryRouter } from "./category.js";
import { budgetRouter } from "./budget.js";
import { userRouter } from "./users.js";
import { authRouter } from "./auth.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/transaction", auth, transactionRouter);
router.use("/category", auth, categoryRouter);
router.use("/budget", auth, budgetRouter);
router.use("/user", auth, userRouter);

export { router as appRouter };
