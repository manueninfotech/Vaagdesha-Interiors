import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadProjectImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "vaagdesha-projects",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);

          return res.status(500).json({
            success: false,
            message: "Failed to upload image",
            error: error.message,
          });
        }

        return res.status(200).json({
          success: true,
          message: "Image uploaded successfully",
          image: {
            url: result.secure_url,
            publicId: result.public_id,
          },
        });
      }
    );

    streamifier
      .createReadStream(req.file.buffer)
      .pipe(uploadStream);
  } catch (error) {
    console.error("Upload Project Image Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to upload image",
      error: error.message,
    });
  }
};