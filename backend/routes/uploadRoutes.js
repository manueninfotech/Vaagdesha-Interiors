import express from "express";

import upload from "../middleware/multer.js";
import { uploadProjectImage } from "../controllers/uploadController.js";

const router = express.Router();

router.post(
  "/upload-project-image",
  upload.single("image"),
  uploadProjectImage
);

export default router;