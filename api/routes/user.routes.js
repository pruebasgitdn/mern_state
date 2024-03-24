// Consultas API del user
import express from "express";
import { test } from "../controllers/user.controller.js";

// Router() crea el enrutador y los guardamos en cons router
const router = express.Router();

router.get("/test", test);

export default router;
