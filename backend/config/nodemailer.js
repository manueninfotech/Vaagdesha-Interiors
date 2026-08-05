import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("NODEMAILER USER:", process.env.EMAIL_USER);
console.log("NODEMAILER PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;