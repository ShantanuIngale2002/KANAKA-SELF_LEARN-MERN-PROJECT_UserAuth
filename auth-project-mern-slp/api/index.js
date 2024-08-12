import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to MongoDB...");
    })
    .catch((err) => {
        console.log(err);
    }); // db connect

const app = express(); // app init
app.use(express.json()); // accepts json

app.listen(3000, () => {
    console.log("Server listening on localhost:3000...");
}); // app listen

// routes
app.use("/api/user", userRoutes); // User > route-path : "/api/user"
app.use("/api/auth", authRoutes); // Auth > route-path : "/api/auth"

// middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});
