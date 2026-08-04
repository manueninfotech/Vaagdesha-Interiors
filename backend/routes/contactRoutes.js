import express from "express";
import upload from "../middleware/multer.js";
import { createContact } from "../controllers/contactController.js";
// import { getContacts } from "../controllers/contactController.js";

const router = express.Router();

router.post("/contact", upload.single("file"), createContact);
//router.get("/contacts", getContacts);

export default router;