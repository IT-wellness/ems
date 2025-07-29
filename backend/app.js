// app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Routes
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import softwareRoutes from './routes/softwareRoutes.js';
import hardwareRoutes from './routes/hardwareRoutes.js';
import licenseRoutes from './routes/licenseRoutes.js';
import integrationRoutes from './routes/integrationRoutes.js'

import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
app.use(helmet())
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const apiPrefix = '/api/v1';

app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/employees`, employeeRoutes);
app.use(`${apiPrefix}/tickets`, ticketRoutes);
app.use(`${apiPrefix}/software`, softwareRoutes);
app.use(`${apiPrefix}/hardware`, hardwareRoutes);
app.use(`${apiPrefix}/licenses`, licenseRoutes);
app.use(`${apiPrefix}/integrations`, integrationRoutes);

// Fallbacks
app.use(notFound);
app.use(errorHandler);

export default app;