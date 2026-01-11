import express from "express";
import {
    registerModel,
    getModelsAdmin,
    getModelByIdAdmin,
    updateModelStatus,
    updateModelAdmin,
    deleteModelAdmin,
    getPublicModels,
    getPublicModelBySlug,
    getModelDashboard,
    getModelProfile,
    updateModelProfile,
    getModelPortfolio,
    uploadMedia,
    deleteMedia,
    getModelBookings,
    getModelEarnings,
    getModelAvailability,
    updateModelAvailability,
} from "../controllers/modelController.js";

import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";
import { createCryptoPayment } from "../controllers/paymentController.js";
import { cryptoWebhook } from "../controllers/cryptoWebhookController.js";

const router = express.Router();

/* ================= PUBLIC ================= */
router.post("/models/register", registerModel);
router.get("/models", getPublicModels);
router.get("/model/:slug", getPublicModelBySlug);

/* ================= MODEL ================= */
router.get(
    "/model/dashboard",
    isAuthenticatedUser,
    authorizeRoles("model"),
    getModelDashboard
);

router.get(
    "/model/profile",
    isAuthenticatedUser,
    authorizeRoles("model"),
    getModelProfile
);

router.put(
    "/model/profile",
    isAuthenticatedUser,
    authorizeRoles("model"),
    updateModelProfile
);

router.get(
    "/model/portfolio",
    isAuthenticatedUser,
    authorizeRoles("model"),
    getModelPortfolio
);

router.post(
    "/model/portfolio",
    isAuthenticatedUser,
    authorizeRoles("model"),
    uploadMedia
);

router.delete(
    "/model/portfolio/:mediaId",
    isAuthenticatedUser,
    authorizeRoles("model"),
    deleteMedia
);

router.get(
    "/model/bookings",
    isAuthenticatedUser,
    authorizeRoles("model"),
    getModelBookings
);

router.get(
    "/model/earnings",
    isAuthenticatedUser,
    authorizeRoles("model"),
    getModelEarnings
);

router.get(
    "/model/availability",
    isAuthenticatedUser,
    authorizeRoles("model"),
    getModelAvailability
);

router.put(
    "/model/availability",
    isAuthenticatedUser,
    authorizeRoles("model"),
    updateModelAvailability
);

/* ================= ADMIN ================= */
router.get(
    "/admin/models",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    getModelsAdmin
);

router.get(
    "/admin/models/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    getModelByIdAdmin
);

router.put(
    "/admin/models/:id/status",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    updateModelStatus
);

router.put(
    "/admin/models/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    updateModelAdmin
);

router.delete(
    "/admin/models/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    deleteModelAdmin
);

router.post("/payments/create", createCryptoPayment);
router.post("/payments/webhook", cryptoWebhook)

export default router;