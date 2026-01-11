// routes/auth.js or wherever your protected routes are

import express from "express";
import {
    getUserProfile,
    updatePassword,
    updateProfile,
    logoutUser,
    uploadAvatar,
    getAllUsers,
    login, // admin only
} from "../controllers/authControllers.js";

import {
    isAuthenticatedUser,
    authorizeRoles,
} from "../middlewares/auth.js";

const router = express.Router();

// Public routes
router.route("/login").post(login);
router.route("/logout").post(logoutUser);

// Protected routes - All authenticated users
router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/me/upload_avatar").put(isAuthenticatedUser, uploadAvatar);

// Admin only routes
router
    .route("/admin/users")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

// Example: Agency & Model can access their own dashboard
router
    .route("/agency/dashboard")
    .get(isAuthenticatedUser, authorizeRoles("agency"), (req, res) => {
        res.json({ message: "Welcome to Agency Dashboard" });
    });

router
    .route("/model/dashboard")
    .get(isAuthenticatedUser, authorizeRoles("model"), (req, res) => {
        res.json({ message: "Welcome to Model Dashboard" });
    });

router
    .route("/client/dashboard")
    .get(isAuthenticatedUser, authorizeRoles("client"), (req, res) => {
        res.json({ message: "Welcome to Client Dashboard" });
    });

export default router;