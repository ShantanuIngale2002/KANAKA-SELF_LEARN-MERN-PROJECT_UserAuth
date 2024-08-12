import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

// db connect
mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to MongoDB...");
    })
    .catch((err) => {
        console.log(err);
    });

// app init
const app = express();

// app listen
app.listen(3000, () => {
    console.log("Server listening on localhost:3000...");
});
