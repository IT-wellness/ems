import { Queue, Worker, QueueEvents } from 'bullmq';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const connection = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
};

// 1. Create queue
export const emailQueue = new Queue('emailQueue', { connection });

// 2. Define processor
const emailWorker = new Worker('emailQueue', async (job) => {
  const { to, name, tempPassword } = job.data;

  // You can customize this mailer (SMTP, service, etc.)
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use 'smtp.ethereal.email' for testing
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"HR Team" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Welcome to the Company!',
    html: `
      <h2>Hello ${name},</h2>
      <p>Your employee account has been created successfully.</p>
      <p><strong>Temporary Password:</strong> ${tempPassword}</p>
      <p>Please login using your company Microsoft account and change your password on first sign-in.</p>
      <br/>
      <p>Best regards,<br/>Wellness Extract HR Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}, { connection });

// Optional: Logging for queue events
const queueEvents = new QueueEvents('emailQueue', { connection });

queueEvents.on('completed', ({ jobId }) => {
  console.log(`✅ Email job ${jobId} completed`);
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
  console.error(`❌ Email job ${jobId} failed: ${failedReason}`);
});
