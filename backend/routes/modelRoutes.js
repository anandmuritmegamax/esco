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
    likeModel,
    getUserModelStatus,
    getApprovedReviews,
    verifyModelEmailOtp,
} from "../controllers/modelController.js";

import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";
//import { createCryptoPayment } from "../controllers/paymentController.js";
import { cryptoWebhook } from "../controllers/cryptoWebhookController.js";
import Model from "../models/Model.js";
import Favourite from "../models/Favourite.js";
import Review from "../models/Review.js";
import { getAdminReports, getMyReports, getPendingReports, markReportReviewed, rejectReport, reportModel } from "../controllers/reportController.js";
import { saveFavourite } from "../controllers/favouriteController.js";
import { approveReview, getAdminReviews, getMyReviews, getPendingReviews, rejectReview, submitReview } from "../controllers/reviewController.js";
import { upload } from "../middlewares/upload.js";


const router = express.Router();

/* ================= PUBLIC ================= */
router.post("/models/register", registerModel);
router.get("/models", getPublicModels);
router.post("/models/verify-email-otp", verifyModelEmailOtp);


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

// router.post(
//     "/model/portfolio",
//     isAuthenticatedUser,
//     authorizeRoles("model"),
//     uploadMedia
// );

router.post(
    "/model/portfolio",
    isAuthenticatedUser,
    authorizeRoles("model"),
    upload.single("file"), // 👈 IMPORTANT
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

router.get(
    "/model/reviews",
    isAuthenticatedUser,
    authorizeRoles("model"),
    getMyReviews
);

router.get(
    "/model/reports",
    isAuthenticatedUser,
    authorizeRoles("model"),
    getMyReports
);

router.get("/model/:slug", getPublicModelBySlug);

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


/* REVIEWS */

router.get(
    "/admin/reviews",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    getAdminReviews
);
router.get(
    "/admin/reviews/:id/pending",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    getPendingReviews
);
router.patch(
    "/admin/reviews/:id/approve",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    approveReview
);
router.patch(
    "/admin/reviews/:id/reject",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    rejectReview
);

/* REPORTS */
/* REPORTS (ADMIN) */

router.get(
    "/admin/reports",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    getAdminReports
);

router.patch(
    "/admin/reports/:id/review",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    markReportReviewed
);

router.patch(
    "/admin/reports/:id/reject",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    rejectReport
);


router.post("/models/:id/like", isAuthenticatedUser, likeModel);

router.post("/models/:id/favourite", isAuthenticatedUser, saveFavourite);

router.get("/models/:slug/nav", async (req, res) => {
    const current = await Model.findOne({ slug: req.params.slug });

    const prev = await Model.findOne({
        createdAt: { $lt: current.createdAt },
    }).sort({ createdAt: -1 });

    const next = await Model.findOne({
        createdAt: { $gt: current.createdAt },
    }).sort({ createdAt: 1 });

    res.json({ prev, next });
});

//router.post("/payments/create", createCryptoPayment);
router.post("/payments/webhook", cryptoWebhook)

//router.post("/models/:id/report", isAuthenticatedUser, reportModel);

router.get(
    "/models/:id/user-status",
    isAuthenticatedUser,
    getUserModelStatus
);


router.post("/models/:id/review", isAuthenticatedUser, submitReview);
router.get("/models/:id/reviews", getApprovedReviews);
router.post("/models/:id/report", isAuthenticatedUser, reportModel);




export default router;