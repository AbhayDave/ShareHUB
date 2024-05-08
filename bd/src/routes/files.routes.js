import {
  createLink,
  sendMail,
  downloadFiles,
  getAllTransfers,
} from "../controllers/files.controller.js";
import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", verifyJWT, createLink);

router.post("/send", verifyJWT, sendMail);

router.get("/:id", verifyJWT, downloadFiles);

router.get("/", verifyJWT, getAllTransfers);

export default router;
