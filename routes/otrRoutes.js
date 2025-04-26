// routes/otrRoutes.js
import express from "express";
import multer from "multer";
import { uploadImageAndVerifyOTR } from "../controllers/otrController.js";

const router = express.Router();

// Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
router.post("/upload", upload.single("uploadedImage"), uploadImageAndVerifyOTR);

export default router;
