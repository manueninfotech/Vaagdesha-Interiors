import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function testSMTP() {
  try {
    console.log("Testing SMTP connection...");

    await transporter.verify();
    console.log("✅ SMTP Connection Successful");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "SMTP Test from Render",
      text: "If you receive this email, SMTP is working correctly.",
    });

    console.log("✅ Test email sent successfully!");
  } catch (error) {
    console.error("❌ SMTP Test Failed");
    console.error(error);
  }
}

testSMTP();