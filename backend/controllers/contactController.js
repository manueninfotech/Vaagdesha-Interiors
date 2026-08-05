import transporter from "../config/nodemailer.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// CREATE CONTACT
export const createContact = async (req, res) => {
  try {
    console.log("API HIT");

    return res.json({
      success: true,
      message: "Backend working",
    });
  } catch (err) {
    console.log(err);
  }
};


// export const getContacts = async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     res.json(contacts);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch contacts" });
//   }
// };