import winston from 'winston';
import path from 'path';
import fs from 'fs';
import 'winston-daily-rotate-file';

const logDir = process.env.LOG_DIR || path.resolve('logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message, ...meta }) => {
  const extra = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
  return `[${timestamp}] ${level.toUpperCase()}: ${message} ${extra}`;
});

// Create Winston logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  exitOnError: false,
  transports: [
    // Console transport (with color)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
      )
    }),

    // Rotating file for errors
    new winston.transports.DailyRotateFile({
      filename: path.join(logDir, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '14d',
      zippedArchive: true
    }),

    // Rotating file for all logs
    new winston.transports.DailyRotateFile({
      filename: path.join(logDir, 'combined-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d',
      zippedArchive: true
    })
  ],
});

logger.exceptions.handle(
  new winston.transports.DailyRotateFile({
    filename: path.join(logDir, 'exceptions-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    zippedArchive: true,
  })
);

process.on('unhandledRejection', (ex) => {
  throw ex;
});

export default logger;