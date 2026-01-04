import express from "express";
import {
    registerModel,
    getModelsAdmin,
    getModelByIdAdmin,
    updateModelStatus,
    updateModelAdmin,
    deleteModelAdmin,
} from "../controllers/modelController.js";

import { getPublicModels, getPublicModelBySlug } from "../controllers/modelController.js";

// OPTIONAL (if you already have auth)
// import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

/* ================= PUBLIC ================= */
router.post("/models/register", registerModel);

/* ================= ADMIN ================= */
router.get(
    "/admin/models",
    // isAuthenticatedUser,
    // authorizeRoles("admin"),
    getModelsAdmin
);


router.get(
    "/admin/models/:id",
    // isAuthenticatedUser,
    // authorizeRoles("admin"),
    getModelByIdAdmin
);

router.put(
    "/admin/models/:id/status",
    // isAuthenticatedUser,
    // authorizeRoles("admin"),
    updateModelStatus
);

router.put(
    "/admin/models/:id",
    // isAuthenticatedUser,
    // authorizeRoles("admin"),
    updateModelAdmin
);

router.delete(
    "/admin/models/:id",
    // isAuthenticatedUser,
    // authorizeRoles("admin"),
    deleteModelAdmin
);

router.get("/models", getPublicModels);
router.get("/model/:slug", getPublicModelBySlug);
export default router;
