// test-email.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_FROM,
  to: 'kanika.singh.dev@gmail.com', // Change this to your desired test Gmail
  subject: 'Test OTP Email',
  text: 'This is a test email to verify SMTP settings.',
};

transporter.sendMail(mailOptions)
  .then(info => console.log('✅ Email sent:', info.response))
  .catch(error => console.error('❌ Error sending email:', error));
