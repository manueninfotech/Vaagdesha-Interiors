import express from "express";

import {
  createProjectSpecification,
  getProjectSpecifications,
  getProjectSpecification,
  updateProjectSpecification,
  deleteProjectSpecification,
} from "../controllers/projectSpecificationController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/project-specifications",
  protect,
  adminOnly,
  createProjectSpecification
);

router.get(
  "/project-specifications",
  protect,
  adminOnly,
  getProjectSpecifications
);

router.get(
  "/project-specifications/:id",
  protect,
  adminOnly,
  getProjectSpecification
);

router.put(
  "/project-specifications/:id",
  protect,
  adminOnly,
  updateProjectSpecification
);

router.delete(
  "/project-specifications/:id",
  protect,
  adminOnly,
  deleteProjectSpecification
);

export default router;