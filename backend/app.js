import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import employeeRoutes from './routes/employeeRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import softwareRoutes from './routes/softwareRoutes.js';
import hardwareRoutes from './routes/hardwareRoutes.js';
import licenceRoutes from './routes/licenceRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/employees', employeeRoutes);
app.use('/tickets', ticketRoutes);
app.use('/software', softwareRoutes);
app.use('/hardware', hardwareRoutes);
app.use('/licenses', licenceRoutes);

export default app;