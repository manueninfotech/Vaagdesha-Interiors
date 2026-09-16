import express from "express";

import {
  uploadProjectImage,
} from "../controllers/uploadController.js";

import upload from "../middleware/multer.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/upload-project-image",
  protect,
  adminOnly,
  upload.single("image"),
  uploadProjectImage
);

export default router;