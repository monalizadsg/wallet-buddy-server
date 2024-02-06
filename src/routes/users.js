import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../model/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // add new user to db
    const newUser = new UserModel({
      username,
      password: hashedPassword,
    });
    await newUser.save();

    // get token after sign in
    const token = jwt.sign(
      { username: newUser.username },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400, // 24hrs in seconds
      }
    );

    res.status(201).send({ token, username: newUser.username });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

export { router as userRouter };
