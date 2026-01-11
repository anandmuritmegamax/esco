// middlewares/auth.js (unchanged, as no issues found)

import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import User from "../models/user.js";
import Client from "../models/Client.js";
import Agency from "../models/Agency.js";
import Model from "../models/Model.js";

// Main authentication middleware - attaches authenticated user to req.user and req.role
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        let user;
        let role = decoded.role?.toLowerCase();

        // Determine which model to query based on role
        if (role === "admin" || !["client", "agency", "model"].includes(role)) {
            // Assume admin or custom roles are in User model
            user = await User.findById(decoded.id).populate("role");
            if (!user) {
                return next(new ErrorHandler("User no longer exists", 401));
            }
            req.role = user.role ? user.role.name.toLowerCase() : "admin";
        } else if (role === "client") {
            user = await Client.findById(decoded.id);
            req.role = "client";
        } else if (role === "agency") {
            user = await Agency.findById(decoded.id);
            req.role = "agency";
        } else if (role === "model") {
            user = await Model.findById(decoded.id);
            req.role = "model";
        }

        if (!user) {
            return next(new ErrorHandler("Invalid token or user no longer exists", 401));
        }

        // For non-admin users, check if account is approved
        if (req.role !== "admin" && user.status !== "approved") {
            return next(new ErrorHandler("Your account is pending approval", 403));
        }

        req.user = user;
        req.user.role = req.role; // Normalize role on user object
        req.user.id = user._id;

        next();
    } catch (error) {
        return next(new ErrorHandler("Token is invalid or expired", 401));
    }
});

// Role-based authorization middleware
export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.role?.toLowerCase();

        if (!allowedRoles.map(r => r.toLowerCase()).includes(userRole)) {
            return next(
                new ErrorHandler(
                    `Role (${userRole}) is not allowed to access this resource`,
                    403
                )
            );
        }
        next();
    };
};