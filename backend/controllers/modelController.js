import bcrypt from "bcryptjs";
import Model from "../models/Model.js";
import Booking from "../models/Booking.js";
import Transaction from "../models/Transaction.js";
import { upload_file, delete_file } from "../utils/cloudinary.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import slugify from "slugify";

/**
 * REGISTER MODEL
 */
export const registerModel = catchAsyncErrors(async (req, res) => {
    const payload = req.body;

    const exists = await Model.findOne({
        $or: [{ username: payload.username }, { email: payload.email }],
    });

    if (exists) {
        return res.status(400).json({
            success: false,
            message: "Username or email already exists",
        });
    }

    payload.slug = slugify(payload.stageName, { lower: true });

    const model = await Model.create(payload);

    res.status(201).json({
        success: true,
        message: "Profile submitted for review",
        modelId: model._id,
    });
});

/**
 * MODEL DASHBOARD
 */
export const getModelDashboard = catchAsyncErrors(async (req, res) => {
    const modelId = req.user._id;

    const totalBookings = await Booking.countDocuments({ modelId });
    const activeBookings = await Booking.countDocuments({ modelId, status: "active" });
    const profileViews = req.user.profileViews || 0; // Assuming profileViews field added

    res.json({
        success: true,
        totalBookings,
        activeBookings,
        profileViews,
    });
});

/**
 * MODEL PROFILE GET
 */
export const getModelProfile = catchAsyncErrors(async (req, res) => {
    const model = await Model.findById(req.user._id).select("-password");

    if (!model) {
        return res.status(404).json({
            success: false,
            message: "Model not found",
        });
    }

    res.json({
        success: true,
        model,
    });
});

/**
 * MODEL PROFILE UPDATE
 */
export const updateModelProfile = catchAsyncErrors(async (req, res) => {
    const model = await Model.findByIdAndUpdate(req.user._id, req.body, { new: true }).select("-password");

    if (!model) {
        return res.status(404).json({
            success: false,
            message: "Model not found",
        });
    }

    res.json({
        success: true,
        message: "Profile updated",
        model,
    });
});

/**
 * MODEL PORTFOLIO GET
 */
export const getModelPortfolio = catchAsyncErrors(async (req, res) => {
    const model = await Model.findById(req.user._id).select("portfolio profileImage");

    if (!model) {
        return res.status(404).json({
            success: false,
            message: "Model not found",
        });
    }

    res.json({
        success: true,
        portfolio: model.portfolio,
        profileImage: model.profileImage,
    });
});

/**
 * UPLOAD MEDIA TO PORTFOLIO
 */
export const uploadMedia = catchAsyncErrors(async (req, res) => {
    const { image } = req.body; // Assume base64 or url
    const uploadResponse = await upload_file(image, "model_portfolio");

    const model = await Model.findById(req.user._id);
    model.portfolio.push({
        url: uploadResponse.url,
        public_id: uploadResponse.public_id,
        type: "image", // or video
    });
    await model.save();

    res.json({
        success: true,
        message: "Media uploaded",
    });
});

/**
 * DELETE MEDIA FROM PORTFOLIO
 */
export const deleteMedia = catchAsyncErrors(async (req, res) => {
    const { mediaId } = req.params;

    const model = await Model.findById(req.user._id);
    const mediaIndex = model.portfolio.findIndex(m => m._id.toString() === mediaId);

    if (mediaIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Media not found",
        });
    }

    await delete_file(model.portfolio[mediaIndex].public_id);
    model.portfolio.splice(mediaIndex, 1);
    await model.save();

    res.json({
        success: true,
        message: "Media deleted",
    });
});

/**
 * MODEL BOOKINGS
 */
export const getModelBookings = catchAsyncErrors(async (req, res) => {
    const bookings = await Booking.find({ modelId: req.user._id }).sort({ createdAt: -1 }).populate("clientId", "name");

    res.json({
        success: true,
        bookings,
    });
});

/**
 * MODEL EARNINGS
 */
export const getModelEarnings = catchAsyncErrors(async (req, res) => {
    const transactions = await Transaction.find({ modelId: req.user._id }).sort({ createdAt: -1 });

    const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);

    res.json({
        success: true,
        transactions,
        total,
    });
});

/**
 * MODEL AVAILABILITY GET
 */
export const getModelAvailability = catchAsyncErrors(async (req, res) => {
    const model = await Model.findById(req.user._id).select("days availability_text");

    res.json({
        success: true,
        days: model.days,
        availability_text: model.availability_text,
    });
});

/**
 * MODEL AVAILABILITY UPDATE
 */
export const updateModelAvailability = catchAsyncErrors(async (req, res) => {
    const { days, availability_text } = req.body;

    const model = await Model.findByIdAndUpdate(req.user._id, { days, availability_text }, { new: true }).select("days availability_text");

    res.json({
        success: true,
        message: "Availability updated",
        availability: model,
    });
});

/* ===============================
   ADMIN: GET ALL MODELS
================================ */
export const getModelsAdmin = catchAsyncErrors(async (req, res) => {
    const models = await Model.find().sort({ createdAt: -1 });

    res.json({
        success: true,
        models,
    });
});

/* ===============================
   ADMIN: GET SINGLE MODEL
================================ */
export const getModelByIdAdmin = catchAsyncErrors(async (req, res) => {
    const model = await Model.findById(req.params.id);

    if (!model) {
        return res.status(404).json({
            success: false,
            message: "Model not found",
        });
    }

    res.json({
        success: true,
        model,
    });
});

/* ===============================
   ADMIN: APPROVE / REJECT
================================ */
export const updateModelStatus = catchAsyncErrors(async (req, res) => {
    const { status } = req.body;

    if (!["approved", "rejected", "pending"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid status",
        });
    }

    const model = await Model.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );

    if (!model) {
        return res.status(404).json({
            success: false,
            message: "Model not found",
        });
    }

    res.json({
        success: true,
        message: "Status updated",
        model,
    });
});

/* ===============================
   ADMIN: UPDATE MODEL
================================ */
export const updateModelAdmin = catchAsyncErrors(async (req, res) => {
    const model = await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!model) {
        return res.status(404).json({
            success: false,
            message: "Model not found",
        });
    }

    res.json({
        success: true,
        message: "Model updated",
        model,
    });
});

/* ===============================
   ADMIN: DELETE MODEL
================================ */
export const deleteModelAdmin = catchAsyncErrors(async (req, res) => {
    const model = await Model.findByIdAndDelete(req.params.id);

    if (!model) {
        return res.status(404).json({
            success: false,
            message: "Model not found",
        });
    }

    res.json({
        success: true,
        message: "Model deleted",
    });
});

/**
 * PUBLIC: Get approved models
 * GET /api/v1/models
 */
export const getPublicModels = catchAsyncErrors(async (req, res) => {
    const { status = "approved" } = req.query;

    const filter = {};
    if (status) {
        filter.status = status;
    }

    const models = await Model.find(filter)
        .select(
            "stageName age based_in nationality profileImage portfolio tagline"
        )
        .sort({ createdAt: -1 });

    res.json({
        success: true,
        models,
    });
});

/**
 * PUBLIC: Get model by slug
 * GET /api/v1/model/:slug
 */
export const getPublicModelBySlug = catchAsyncErrors(async (req, res) => {
    const { slug } = req.params;

    const model = await Model.findOne({
        slug,
        status: "approved",
    }).select("-password -email");

    if (!model) {
        return res.status(404).json({
            success: false,
            message: "Model not found",
        });
    }

    res.json({
        success: true,
        model,
    });
});