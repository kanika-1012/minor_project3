import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// API Key middleware for notification endpoints
const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    res.status(403).json({ error: 'Forbidden: Invalid API Key' });
    return;
  }
  next();
};

interface OTPEntry {
  otp: string;
  expiresAt: Date;
}

const otpStore: { [email: string]: OTPEntry } = {};

// Nodemailer setup with TLS fix (required for Gmail dev testing)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // e.g. smtp.gmail.com
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true', // false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify transporter configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Error connecting to mail server:', error);
  } else {
    console.log('✅ Mail server is ready to send emails');
  }
});

const generateOTP = (): string => Math.floor(100000 + Math.random() * 900000).toString();

// Endpoint to send OTP
app.post('/api/send-otp', async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  if (!email || !email.endsWith('@kiit.ac.in')) {
    res.status(400).json({ error: 'Invalid email address. Only KIIT emails are allowed.' });
    return;
  }

  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 minutes
  otpStore[email] = { otp, expiresAt };

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP ${otp} sent to ${email}`);
    res.json({ message: 'OTP sent successfully' });
  } catch (error: any) {
    console.error('❌ Error sending OTP:', error.message);
    res.status(500).json({ error: 'Failed to send OTP email', detail: error.message });
  }
});

// Endpoint to verify OTP
app.post('/api/verify-otp', (req: Request, res: Response): void => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record) {
    res.status(400).json({ error: 'No OTP request found for this email.' });
    return;
  }

  if (record.otp !== otp) {
    res.status(401).json({ error: 'Invalid OTP' });
    return;
  }

  if (record.expiresAt < new Date()) {
    delete otpStore[email];
    res.status(410).json({ error: 'OTP expired' });
    return;
  }

  delete otpStore[email];
  res.json({ message: 'OTP verified successfully' });
});

// Endpoint to notify Topic Admin (secured with API key)
app.post('/api/notify-topic-admin', apiKeyMiddleware, async (req: Request, res: Response) => {
  const { grievance } = req.body;
  if (!grievance) {
    res.status(400).json({ error: 'Missing grievance data' });
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.TOPIC_ADMIN_EMAIL,
    subject: `New Grievance: ${grievance.subject}`,
    text: `New grievance submitted:\n\nCategory: ${grievance.category}\nSubject: ${grievance.subject}\nDescription: ${grievance.description}\nSubmitted by: ${grievance.user_id}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Notification sent to topic admin.' });
  } catch (error: any) {
    console.error('❌ Error notifying topic admin:', error.message);
    res.status(500).json({ error: 'Failed to send notification.' });
  }
});

// Endpoint to notify Main Admin for escalated grievances (secured with API key)
app.post('/api/notify-main-admin', apiKeyMiddleware, async (req: Request, res: Response) => {
  const { grievance } = req.body;
  if (!grievance) {
    res.status(400).json({ error: 'Missing grievance data' });
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.MAIN_ADMIN_EMAIL,
    subject: `Escalated Grievance: ${grievance.subject}`,
    text: `Grievance #${grievance.id} has been escalated.\n\nCategory: ${grievance.category}\nSubject: ${grievance.subject}\nDescription: ${grievance.description}\nSubmitted on: ${grievance.created_at}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Notification sent to main admin.' });
  } catch (error: any) {
    console.error('❌ Error notifying main admin:', error.message);
    res.status(500).json({ error: 'Failed to send notification.' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
