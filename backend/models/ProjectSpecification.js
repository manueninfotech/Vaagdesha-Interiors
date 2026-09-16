import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    fields: {
      type: Map,
      of: String,
      default: {},
    },

    description: {
      type: String,
      default: "",
    },

    images: [
      {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },
    ],
  },
  {
    _id: false,
  }
);

const projectSpecificationSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    projectName: {
      type: String,
      required: true,
      trim: true,
    },

    clientName: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    projectType: {
      type: String,
      enum: ["Residential", "Commercial"],
      default: "Residential",
    },

    date: {
      type: Date,
    },

    sections: {
      type: Map,
      of: sectionSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "ProjectSpecification",
  projectSpecificationSchema
);