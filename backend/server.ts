import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

interface OTPEntry {
  otp: string;
  expiresAt: Date;
}

// In-memory store for OTPs (for demo only)
const otpStore: { [email: string]: OTPEntry } = {};

// Create a Nodemailer transporter using SMTP settings from your .env file
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // e.g., 'smtp.gmail.com'
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // your email password or app-specific password
  },
});

// Helper function to generate a random 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;

  // Only allow KIIT email addresses
  if (!email || !email.endsWith('@kiit.ac.in')) {
    return res.status(400).json({ error: 'Invalid email address. Only KIIT emails are allowed.' });
  }

  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

  // Store OTP for this email
  otpStore[email] = { otp, expiresAt };

  // Setup email options
  const mailOptions = {
    from: process.env.EMAIL_FROM, // Sender address (set in your .env)
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'OTP sent successfully' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send OTP email' });
  }
});

app.listen(port, () => {
  console.log(`OTP API server is running on port ${port}`);
});
