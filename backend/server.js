import express from "express";
import dotenv from "dotenv";
// import mongoose from "mongoose";
import cors from "cors";

import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Not Loaded ❌");
console.log("OWNER_EMAIL:", process.env.OWNER_EMAIL);

const app = express();

app.use(
  cors({
    origin: [
      "https://manueninfotech.github.io",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log(err));

app.use("/api", contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});