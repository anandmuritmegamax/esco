import express from "express";
import {
    createPage,
    getPages,
    getPageById,
    updatePage,
    deletePage,
    getPageBySlug,
    getPublishedPages,
} from "../controllers/pageController.js";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "../middlewares/auth.js";

const router = express.Router();

/* ===== ADMIN ROUTES ===== */
router.post("/admin/pages", isAuthenticatedUser, authorizeRoles("admin"), createPage);
router.get("/admin/pages", isAuthenticatedUser, authorizeRoles("admin"), getPages);
router.get("/admin/pages/:id", isAuthenticatedUser, authorizeRoles("admin"), getPageById);
router.put("/admin/pages/:id", isAuthenticatedUser, authorizeRoles("admin"), updatePage);
router.delete("/admin/pages/:id", isAuthenticatedUser, authorizeRoles("admin"), deletePage);

/* ===== PUBLIC ROUTE ===== */
router.get("/pages/public", getPublishedPages);

router.get("/pages/public/:slug", getPageBySlug);

export default router;
