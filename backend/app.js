import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDatabase } from './config/dbConnect.js';
import errorMiddleware from './middlewares/errors.js';

import "./cron/planExpiryNotifier.js";



// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    process.exit(1);
});

// Load environment variables
dotenv.config({ path: 'backend/config/config.env' });

// Connect to database
await connectDatabase();

// Initialize app
const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Route imports
import authRoutes from './routes/auth.js';
import menuRoutes from './routes/menu.js';
import permissionRoutes from './routes/permission.js';
import roleRoutes from './routes/role.js';
import flightRoutes from './routes/flightRoutes.js';
import flightTypeRoutes from './routes/flightTypeRoutes.js';
import airportRoutes from './routes/airportRoutes.js';
import facilityRoutes from './routes/facilityRoutes.js';
import flightCategoryRoutes from './routes/flightCategoryRoutes.js';
import pilotRoutes from './routes/pilotRoutes.js';
import priceSettingRoutes from './routes/priceSettingRoutes.js';
import modelRoutes from "./routes/modelRoutes.js";
import s3Routes from "./routes/s3Routes.js";
import agencyRoutes from "./routes/agencyRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
//import authUserRoutes from './routes/authRoutes.js';
import homeRoutes from "./routes/homeRoutes.js";
import cryptoRoutes from "./routes/cryptoRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";
import masterRoutes from "./routes/masterRoutes.js";
import pricingPlanRoutes from "./routes/pricingPlanRoutes.js";
import adminNotificationRoutes from "./routes/adminNotificationRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";

// Mount routes
const routes = [
    authRoutes,
    menuRoutes,
    pilotRoutes,
    flightCategoryRoutes,
    permissionRoutes,
    roleRoutes,
    flightRoutes,
    flightTypeRoutes,
    airportRoutes,
    facilityRoutes,
    priceSettingRoutes,
    modelRoutes,
    s3Routes,
    agencyRoutes,
    clientRoutes,
    homeRoutes,
    //authUserRoutes,
    cryptoRoutes,
    locationRoutes,
    paymentRoutes,
    settingRoutes,
    masterRoutes,
    pricingPlanRoutes,
    adminNotificationRoutes,
    pageRoutes,
];

routes.forEach((route) => app.use('/api/v1', route));

// Error middleware
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err.message);
    server.close(() => process.exit(1));
});
