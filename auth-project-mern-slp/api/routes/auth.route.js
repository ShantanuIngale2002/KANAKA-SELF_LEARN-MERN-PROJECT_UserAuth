import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

// route('/api/auth') : '/signup
router.post("/signup", signup);

export default router;
