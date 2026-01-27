import express from "express";
import { sendManualNotification } from "../controllers/adminNotificationController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

router.post("/admin/notifications/send", isAuthenticatedUser, sendManualNotification);

export default router;
