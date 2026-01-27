import express from "express";
import {
    registerAgency,
    getAgenciesAdmin,
    getAgencyByIdAdmin,
    updateAgencyStatus,
    updateAgencyAdmin,
    deleteAgencyAdmin,
    getPendingAgencies,
    getAgencyDashboard,
    getAgencyProfile,
    updateAgencyProfile,
    getAgencyModels,
    addModel,
    getAgencyBookings,
    getAgencyEarnings,
    verifyAgencyEmailOtp,
    getAgencyModelById,
    updateAgencyModel,
} from "../controllers/agencyController.js";

import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

/* ===== PUBLIC ===== */
router.post("/agencies/register", registerAgency);
router.post("/agencies/verify-email-otp", verifyAgencyEmailOtp);


/* ===== AGENCY ===== */
router.get(
    "/agency/dashboard",
    isAuthenticatedUser,
    authorizeRoles("agency"),
    getAgencyDashboard
);

router.get(
    "/agency/profile",
    isAuthenticatedUser,
    authorizeRoles("agency"),
    getAgencyProfile
);

router.put(
    "/agency/profile",
    isAuthenticatedUser,
    authorizeRoles("agency"),
    updateAgencyProfile
);

router.get(
    "/agency/models",
    isAuthenticatedUser,
    authorizeRoles("agency"),
    getAgencyModels
);

router.post(
    "/agency/models",
    isAuthenticatedUser,
    authorizeRoles("agency"),
    addModel
);

router.get(
    "/agency/models/:id",
    isAuthenticatedUser,
    authorizeRoles("agency"),
    getAgencyModelById
);

router.put(
    "/agency/models/:id",
    isAuthenticatedUser,
    authorizeRoles("agency"),
    updateAgencyModel
);

router.get(
    "/agency/bookings",
    isAuthenticatedUser,
    authorizeRoles("agency"),
    getAgencyBookings
);

router.get(
    "/agency/earnings",
    isAuthenticatedUser,
    authorizeRoles("agency"),
    getAgencyEarnings
);

/* ===== ADMIN ===== */
router.get(
    "/admin/agencies/pending",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    getPendingAgencies
);

router.get(
    "/admin/agencies",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    getAgenciesAdmin
);

router.get(
    "/admin/agencies/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    getAgencyByIdAdmin
);

router.put(
    "/admin/agencies/:id/status",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    updateAgencyStatus
);

router.put(
    "/admin/agencies/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    updateAgencyAdmin
);

router.delete(
    "/admin/agencies/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    deleteAgencyAdmin
);

export default router;