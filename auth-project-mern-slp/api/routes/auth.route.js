import express from "express";
import { signup, singin, google } from "../controllers/auth.controller.js";

const router = express.Router();

// route'/api/auth/<anyBelow>'
router.post("/signup", signup);
router.post("/signin", singin);
router.post("/google", google);

export default router;
