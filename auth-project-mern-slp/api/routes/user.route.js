import express from "express";
import { test } from "../controllers/user.controller.js";

const router = express.Router();

// path : /api/user/ : its root
router.get("/", test);

export default router;
