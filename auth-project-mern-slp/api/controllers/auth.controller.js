import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; // password encrypt/decrypt
import { errorHandler } from "../utils/error.js";

// next means middleware
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10); // 10 no-of-rounds
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save(); // wait until process is done (sync)
        res.status(201).json({ message: "User created successfully" }); // success
    } catch (err) {
        // res.status(500).json(err.message); // duplicate error
        next(err);
    }
};
