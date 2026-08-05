import transporter from "../config/nodemailer.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// CREATE CONTACT
export const createContact = async (req, res) => {
  try {
    const { name, phone, email, location, details } = req.body;

    let fileUrl = "";

    // Validation
    if (!name || !phone || !email || !details) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    if (req.file && req.file.buffer) {

  const streamUpload = () => {
    return new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "vaagdeesha-inquiries",
        },
        (error, result) => {

          if (error) {
            reject(error);
          } else {
            resolve(result);
          }

        }
      );

      streamifier
        .createReadStream(req.file.buffer)
        .pipe(stream);

    });
  };

  const result = await streamUpload();

  fileUrl = result.secure_url;

}

    const mailOptions = {
      from: process.env.BREVO_SMTP_USER,
      to: process.env.OWNER_EMAIL,
      subject: "New Inquiry - Vaagdeesha Interiors",

      html: `
      <div style="font-family:Arial,sans-serif;background:#f7f7f7;padding:40px;">

      <div style="
      max-width:700px;
      margin:auto;
      background:#111111;
      border-radius:18px;
      overflow:hidden;
      border:1px solid #C89B3C33;
      ">

      <div style="
      padding:35px;
      text-align:center;
      background:linear-gradient(90deg,#111,#1c1c1c);
      border-bottom:1px solid #C89B3C33;
      ">

      <h1 style="
      margin:0;
      color:#C89B3C;
      font-size:28px;
      letter-spacing:3px;
      ">
      VAAGDEESHA INTERIORS
      </h1>

      <p style="
      color:#ffffff;
      margin-top:10px;
      letter-spacing:4px;
      font-size:12px;
      text-transform:uppercase;
      ">
      New Client Inquiry
      </p>

      </div>

      <div style="padding:35px;">

      <h3 style="color:#C89B3C;">Client Information</h3>

      <div style="margin-top:20px;">

  <p style="margin:12px 0;">
    <strong style="color:#999;">Name:</strong><br>
    <span style="color:#fff;">${name}</span>
  </p>

  <p style="margin:12px 0;">
    <strong style="color:#999;">Phone:</strong><br>
    <span style="color:#fff;">${phone}</span>
  </p>

  <p style="margin:12px 0;">
    <strong style="color:#999;">Email:</strong><br>
    <a
      href="mailto:${email}"
      style="
        color:#C89B3C;
        text-decoration:none;
        word-break:break-word;
        overflow-wrap:anywhere;
      "
    >
      ${email}
    </a>
  </p>

  <p style="margin:12px 0;">
    <strong style="color:#999;">Location:</strong><br>
    <span style="color:#fff;">${location || "-"}</span>
  </p>

</div>

      <hr style="
      margin:35px 0;
      border:none;
      border-top:1px solid #333;
      ">

      <h3 style="color:#C89B3C;">
      Project Details
      </h3>

      <div style="
      background:#181818;
      padding:20px;
      border-radius:12px;
      color:#E5E5E5;
      line-height:1.8;
      ">
      ${details}
      </div>

      ${
        req.file
          ? `
      <h3 style="margin-top:35px;color:#C89B3C;">
      Attachment
      </h3>

      <p>
        📎
        <a
          href="${fileUrl}"
          target="_blank"
          style="
            color:#C89B3C;
            text-decoration:none;
            font-weight:600;
          "
        >
          ${req.file.originalname}
        </a>
      </p>
      `
          : ""
      }

      <hr style="
      margin:35px 0;
      border:none;
      border-top:1px solid #333;
      ">

      <p style="
      font-size:13px;
      color:#888;
      text-align:center;
      ">
      This inquiry was submitted from the
      <strong>Vaagdeesha Interiors</strong> website.
      </p>

      </div>

      </div>

      </div>
      `,

      attachments: req.file
        ? [
            {
              filename: req.file.originalname,
              content: req.file.buffer,
            },
          ]
        : [],
    };

    console.log("Before sendMail");

    const ownerMail = await transporter.sendMail(mailOptions);
    console.log("Owner mail sent:", ownerMail.messageId);

    const customerMail = await transporter.sendMail({
      from: process.env.BREVO_SMTP_USER,
      to: email,

      subject: "We've received your inquiry | Vaagdeesha Interiors",

      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;padding:30px;background:#111111;color:#F5F1EA;">

          <h2 style="color:#C89B3C;">
            Thank You, ${name}!
          </h2>

          <p style="line-height:1.8;font-size:15px;">
            We have successfully received your inquiry.
          </p>

          <p style="line-height:1.8;font-size:15px;">
            Our design team will carefully review your requirements and
            get in touch with you as soon as possible.
          </p>

          <hr style="border:none;border-top:1px solid #333;margin:30px 0;" />

          <h3 style="color:#C89B3C;">
            Your Submitted Details
          </h3>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Location:</strong> ${location || "-"}</p>

          <hr style="border:none;border-top:1px solid #333;margin:30px 0;" />

          <p style="font-size:14px;color:#B0B0B0;">
            Vaagdeesha Interiors
            <br>
            Designing timeless interiors with elegance and precision.
          </p>

        </div>
      `,
    });
    console.log("After second mail");

    return res.status(200).json({
      success: true,
      message: "Inquiry sent successfully.",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to send inquiry.",
    });
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