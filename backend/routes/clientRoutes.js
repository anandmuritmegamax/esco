import express from "express";
import {
    registerClient,
    getClientsAdmin,
    getClientByIdAdmin,
    updateClientStatus,
    updateClientAdmin,
    deleteClientAdmin,
    getClientDashboard,
    getClientProfile,
    updateClientProfile,
    getModels,
    getFavorites,
    addFavorite,
    removeFavorite,
    getBookings,
    createBooking,
} from "../controllers/clientController.js";

import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

/* ===== PUBLIC ===== */
router.post("/client/register", registerClient);

/* ===== CLIENT ===== */
router.get(
    "/client/dashboard",
    isAuthenticatedUser,
    authorizeRoles("client"),
    getClientDashboard
);

router.get(
    "/client/profile",
    isAuthenticatedUser,
    authorizeRoles("client"),
    getClientProfile
);

router.put(
    "/client/profile",
    isAuthenticatedUser,
    authorizeRoles("client"),
    updateClientProfile
);

router.get(
    "/models",
    getModels // Public, but can be used by client
);

router.get(
    "/client/favorites",
    isAuthenticatedUser,
    authorizeRoles("client"),
    getFavorites
);

router.post(
    "/client/favorites",
    isAuthenticatedUser,
    authorizeRoles("client"),
    addFavorite
);

router.delete(
    "/client/favorites/:modelId",
    isAuthenticatedUser,
    authorizeRoles("client"),
    removeFavorite
);

router.get(
    "/client/bookings",
    isAuthenticatedUser,
    authorizeRoles("client"),
    getBookings
);

router.post(
    "/client/bookings",
    isAuthenticatedUser,
    authorizeRoles("client"),
    createBooking
);

/* ===== ADMIN ===== */
router.get(
    "/admin/clients",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    getClientsAdmin
);

router.get(
    "/admin/clients/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    getClientByIdAdmin
);

router.put(
    "/admin/clients/:id/status",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    updateClientStatus
);

router.put(
    "/admin/clients/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    updateClientAdmin
);

router.delete(
    "/admin/clients/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    deleteClientAdmin
);

export default router;