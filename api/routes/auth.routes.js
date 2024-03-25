import express from "express";
import { signup, singin } from "../controllers/auth.contoller.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", singin);

export default router;
