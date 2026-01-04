import express from "express";
import {
    registerAgency,
    getAgenciesAdmin,
    getAgencyByIdAdmin,
    updateAgencyStatus,
    updateAgencyAdmin,
    deleteAgencyAdmin,
    getPendingAgencies,
} from "../controllers/agencyController.js";

// OPTIONAL AUTH
// import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

/* ===== PUBLIC ===== */
router.post("/agencies/register", registerAgency);

router.get(
    "/admin/agencies/pending",
    // isAuthenticatedUser,
    // authorizeRoles("admin"),
    getPendingAgencies
);

/* ===== ADMIN ===== */
router.get(
    "/admin/agencies",
    // isAuthenticatedUser,
    // authorizeRoles("admin"),
    getAgenciesAdmin
);

router.get(
    "/admin/agencies/:id",
    // isAuthenticatedUser,
    // authorizeRoles("admin"),
    getAgencyByIdAdmin
);

router.put(
    "/admin/agencies/:id/status",
    // isAuthenticatedUser,
    // authorizeRoles("admin"),
    updateAgencyStatus
);

router.put(
    "/admin/agencies/:id",
    // isAuthenticatedUser,
    // authorizeRoles("admin"),
    updateAgencyAdmin
);

router.delete(
    "/admin/agencies/:id",
    // isAuthenticatedUser,
    // authorizeRoles("admin"),
    deleteAgencyAdmin
);



export default router;
