import express from "express";
import bodyParser from "body-parser";

import { CategoryModel } from "../model/Category.js";

const router = express.Router();

router.use(bodyParser.json());

// create new category
router.post("/", async (req, res) => {
  const { name, type } = req.body;

  try {
    const newCategory = new CategoryModel({
      name,
      type,
    });

    const category = await newCategory.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// get all categories
router.get("/", async (req, res) => {
  try {
    const result = await CategoryModel.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

// modify category
router.put("/", async (req, res) => {
  const { id, name } = req.body;

  try {
    const result = await CategoryModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete category
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await CategoryModel.findByIdAndRemove(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

export { router as categoryRouter };
