import ProjectSpecification from "../models/ProjectSpecification.js";
import Counter from "../models/Counter.js";

/**
 * CREATE PROJECT SPECIFICATION
 */
export const createProjectSpecification = async (req, res) => {
  try {
    const year = new Date().getFullYear();

    // Atomically increment the project counter for the current year
    const counter = await Counter.findOneAndUpdate(
      {
        key: `project-${year}`,
      },
      {
        $inc: {
          sequence: 1,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    const projectNumber = String(counter.sequence).padStart(3, "0");

    const projectId = `VGI-${year}-${projectNumber}`;

    const {
  _id,
  createdAt,
  updatedAt,
  __v,
  ...cleanProjectData
} = req.body;

const projectData = {
  ...cleanProjectData,
  projectId,
};

    const project = await ProjectSpecification.create(projectData);

    res.status(201).json({
      success: true,
      message: "Project specification created successfully",
      project,
    });
  } catch (error) {
    console.error("Create Project Specification Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create project specification",
      error: error.message,
    });
  }
};


/**
 * GET ALL PROJECT SPECIFICATIONS
 */
export const getProjectSpecifications = async (req, res) => {
  try {
    const projects = await ProjectSpecification.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("Get Project Specifications Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch project specifications",
      error: error.message,
    });
  }
};


/**
 * GET SINGLE PROJECT SPECIFICATION
 */
export const getProjectSpecification = async (req, res) => {
  try {
    const project = await ProjectSpecification.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project specification not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Get Project Specification Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch project specification",
      error: error.message,
    });
  }
};


/**
 * UPDATE PROJECT SPECIFICATION
 */
export const updateProjectSpecification = async (req, res) => {
  try {
    const project = await ProjectSpecification.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project specification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project specification updated successfully",
      project,
    });
  } catch (error) {
    console.error("Update Project Specification Error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Project ID already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update project specification",
      error: error.message,
    });
  }
};


/**
 * DELETE PROJECT SPECIFICATION
 */
export const deleteProjectSpecification = async (req, res) => {
  try {
    const project = await ProjectSpecification.findByIdAndDelete(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project specification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project specification deleted successfully",
    });
  } catch (error) {
    console.error("Delete Project Specification Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete project specification",
      error: error.message,
    });
  }
};