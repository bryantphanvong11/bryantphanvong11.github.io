require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.post("/send", async (req, res) => {
  console.log("Request received:", req.body);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("Please fill out all fields.");
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: "Test Message",
      text: message,
    });

    console.log("Email sent successfully!");
    res.status(200).send("Message sent successfully!");
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    res.status(500).send("Error sending message.");
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
