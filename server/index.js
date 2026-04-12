/* eslint-disable no-undef */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const multer = require("multer");

const app = express();

// Allow requests from your frontend (update with your actual domain or '*' for testing)
app.use(cors({ origin: "*" })); // Change to your frontend URL in production, e.g. 'https://yourdomain.com'
app.use(express.json());

// For file uploads (in memory – good for small files)
const upload = multer({ storage: multer.memoryStorage() });

// Your contact endpoint
app.post("/api/contact", upload.single("attachment"), async (req, res) => {
  const {
    name,
    company,
    position,
    weAre,
    website,
    attachmentIntro,
    inquiry,
    wechatId,
    otherContacts,
  } = req.body;

  const file = req.file;

  // Basic validation
  if (!name || !company || !position || !inquiry) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const brevoPayload = {
      sender: {
        name: "Website Contact Form",
        email: "form@xn--prsm-6pa.com", // Use default for this test – we'll change to your domain later
      },
      to: [
        {
          email: "ch.elevateco@gmail.com", // ← CHANGE THIS to the email where you want to receive submissions
          name: "You",
        },
      ],
      replyTo: {
        email: req.body.email || "no-reply@example.com", // fallback if no email field
        name: name || "Visitor",
      },
      subject: `New Inquiry from ${name} (${company})`,
      htmlContent: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>We are:</strong> ${weAre}</p>
        <p><strong>Website:</strong> ${website || "Not provided"}</p>
        <p><strong>Attachment Intro:</strong> ${attachmentIntro || "None"}</p>
        <p><strong>WeChat ID:</strong> ${wechatId || "Not provided"}</p>
        <p><strong>Other Contacts:</strong> ${otherContacts || "Not provided"}</p>
        
        <h3 style="margin-top: 20px;">Inquiry / Demand:</h3>
        <p style="white-space: pre-wrap;">${inquiry}</p>

        ${file ? `
        <hr>
        <p><strong>Attachment:</strong> ${file.originalname} 
        (${(file.size / 1024).toFixed(1)} KB)</p>` : ""}
      `,
    };

    // If there's a file, add it as base64 attachment
    // If there's a file, add it as base64 attachment
    if (file) {
      brevoPayload.attachment = [
        {
          name: file.originalname,
          content: file.buffer.toString("base64"),
        },
      ];
    }

    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      brevoPayload,
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      },
    );


    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Brevo error:", error?.response?.data || error.message);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
