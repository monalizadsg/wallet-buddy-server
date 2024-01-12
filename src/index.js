import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// connect to db
mongoose.connect(mongoURI);


app.listen(port, () => console.log("SERVER STARTED"));