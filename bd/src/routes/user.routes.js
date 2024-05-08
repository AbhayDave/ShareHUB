import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/users.controller.js";
import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.post("/logout", verifyJWT, logoutUser);

router.get("/current-user", verifyJWT, getCurrentUser);

export default router;
