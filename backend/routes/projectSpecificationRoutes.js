import express from "express";

import {
  createProjectSpecification,
  getProjectSpecifications,
  getProjectSpecification,
  updateProjectSpecification,
  deleteProjectSpecification,
} from "../controllers/projectSpecificationController.js";

const router = express.Router();

// Create a new project specification
router.post("/project-specifications", createProjectSpecification);

// Get all project specifications
router.get("/project-specifications", getProjectSpecifications);

// Get one project specification
router.get("/project-specifications/:id", getProjectSpecification);

// Update a project specification
router.put("/project-specifications/:id", updateProjectSpecification);

// Delete a project specification
router.delete("/project-specifications/:id", deleteProjectSpecification);

export default router;