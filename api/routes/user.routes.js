// Consultas API del user
import express from "express";
import {
  deleteUser,
  getUser,
  getUserListings,
  test,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

// Router() crea el enrutador y los guardamos en cons router
const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListings);
router.get("/:id", verifyToken, getUser);

export default router;
