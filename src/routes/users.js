import express from "express";
import bcrypt from "bcrypt";
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

    res.status(201).send({ username: newUser.username });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

// router.get("/me", async (req, res) => {
//   const username = req.body.username;
//   const user = await UserModel.findOne({ username });
//   res.send({
//     firstName: user.firstName,
//     lastName: user.lastName,
//   });
// });

export { router as userRouter };
