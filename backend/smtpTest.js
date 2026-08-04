import dotenv from "dotenv";

dotenv.config();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌"
);
console.log(
  "OWNER_EMAIL:",
  process.env.OWNER_EMAIL ? "Loaded ✅" : "Missing ❌"
);

process.exit(0);