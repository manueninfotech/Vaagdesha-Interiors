import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("NODEMAILER USER:", process.env.EMAIL_USER);
console.log("NODEMAILER PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 2525, // Port 2525 bypasses Render's block
    auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASSWORD
    }
});

export default transporter;