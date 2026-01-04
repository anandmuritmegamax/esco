import express from "express";
import {
    registerClient,
    getClientsAdmin,
    getClientByIdAdmin,
    updateClientStatus,
    updateClientAdmin,
    deleteClientAdmin,
} from "../controllers/clientController.js";

// import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

/* ===== PUBLIC ===== */
router.post("/client/register", registerClient);

/* ===== ADMIN ===== */
router.get(
    "/admin/clients",
    // isAuthenticatedUser,
    // authorizeRoles("admin"),
    getClientsAdmin
);

router.get(
    "/admin/clients/:id",
    // isAuthenticatedUser,
    // authorizeRoles("admin"),
    getClientByIdAdmin
);

router.put(
    "/admin/clients/:id/status",
    // isAuthenticatedUser,
    // authorizeRoles("admin"),
    updateClientStatus
);

router.put(
    "/admin/clients/:id",
    // isAuthenticatedUser,
    // authorizeRoles("admin"),
    updateClientAdmin
);

router.delete(
    "/admin/clients/:id",
    // isAuthenticatedUser,
    // authorizeRoles("admin"),
    deleteClientAdmin
);

export default router;
