/* eslint-disable no-undef */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const multer = require("multer");

const app = express();

// Nginx sits in front of this server, so req.ip comes from X-Forwarded-For.
app.set("trust proxy", "loopback");

// The site calls /api through the same origin (Nginx proxy), so no CORS is
// needed by default. List extra origins in ALLOWED_ORIGINS (comma-separated)
// if the API is ever called from another domain.
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);
app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : false }));
app.use(express.json({ limit: "100kb" }));

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_BYTES, files: 1, fields: 20, fieldSize: 20 * 1024 },
  fileFilter: (req, file, cb) => {
    const name = file.originalname.toLowerCase();
    const ok = ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext));
    cb(ok ? null : new multer.MulterError("LIMIT_UNEXPECTED_FILE", "attachment"), ok);
  },
});

// Simple in-memory rate limit: RATE_LIMIT_MAX submissions per IP per window.
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 8;
const hits = new Map();
function rateLimit(req, res, next) {
  const now = Date.now();
  const recent = (hits.get(req.ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    return res.status(429).json({
      success: false,
      message: "Too many submissions. Please try again later.",
    });
  }
  recent.push(now);
  hits.set(req.ip, recent);
  next();
}
setInterval(() => {
  const now = Date.now();
  for (const [ip, times] of hits) {
    if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(ip);
  }
}, RATE_WINDOW_MS).unref();

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isEmail = (value) =>
  typeof value === "string" && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const CONTACT_TO = process.env.CONTACT_TO || "ch.elevateco@gmail.com";
const CONTACT_FROM = process.env.CONTACT_FROM || "form@xn--prsm-6pa.com";

app.post("/api/contact", rateLimit, upload.single("attachment"), async (req, res) => {
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
    email,
  } = req.body;

  const file = req.file;

  if (!name || !company || !position || !inquiry) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const e = escapeHtml;

  try {
    const brevoPayload = {
      sender: { name: "Website Contact Form", email: CONTACT_FROM },
      to: [{ email: CONTACT_TO, name: "Prism" }],
      // Header values can't carry markup, but strip line breaks so a name
      // can't inject extra headers.
      subject: `New Inquiry from ${String(name).replace(/[\r\n]+/g, " ")} (${String(company).replace(/[\r\n]+/g, " ")})`,
      htmlContent: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${e(name)}</p>
        <p><strong>Company:</strong> ${e(company)}</p>
        <p><strong>Position:</strong> ${e(position)}</p>
        <p><strong>We are:</strong> ${e(weAre)}</p>
        <p><strong>Website:</strong> ${e(website || "Not provided")}</p>
        <p><strong>Attachment Intro:</strong> ${e(attachmentIntro || "None")}</p>
        <p><strong>WeChat ID:</strong> ${e(wechatId || "Not provided")}</p>
        <p><strong>Other Contacts:</strong> ${e(otherContacts || "Not provided")}</p>

        <h3 style="margin-top: 20px;">Inquiry / Demand:</h3>
        <p style="white-space: pre-wrap;">${e(inquiry)}</p>

        ${file ? `
        <hr>
        <p><strong>Attachment:</strong> ${e(file.originalname)}
        (${(file.size / 1024).toFixed(1)} KB)</p>` : ""}
      `,
    };

    if (isEmail(email)) {
      brevoPayload.replyTo = { email, name: String(name).slice(0, 100) };
    }

    if (file) {
      brevoPayload.attachment = [
        {
          name: file.originalname,
          content: file.buffer.toString("base64"),
        },
      ];
    }

    await axios.post("https://api.brevo.com/v3/smtp/email", brevoPayload, {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      timeout: 15000,
    });

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Brevo error:", error?.response?.data || error.message);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

// Upload errors (file too large, wrong type) come back as readable JSON.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "Attachment is too large (10 MB max)."
        : err.code === "LIMIT_UNEXPECTED_FILE"
          ? "Attachment must be a PDF, Word document, JPG or PNG."
          : "Upload rejected.";
    return res.status(400).json({ success: false, message });
  }
  console.error(err);
  res.status(500).json({ success: false, message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
