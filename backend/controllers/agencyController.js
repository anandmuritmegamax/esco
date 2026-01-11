import bcrypt from "bcryptjs";
import Agency from "../models/Agency.js";
import Model from "../models/Model.js";
import Booking from "../models/Booking.js"; // Assume exists
import Transaction from "../models/Transaction.js"; // Assume exists
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

/* ===============================
   REGISTER AGENCY (PUBLIC)
================================ */
export const registerAgency = catchAsyncErrors(async (req, res) => {
    const payload = req.body;

    const exists = await Agency.findOne({
        $or: [{ username: payload.username }, { email: payload.email }],
    });

    if (exists) {
        return res.status(400).json({
            success: false,
            message: "Username or email already exists",
        });
    }

    //payload.password = await bcrypt.hash(payload.password, 10);

    const agency = await Agency.create(payload);

    res.status(201).json({
        success: true,
        message: "Agency submitted for review",
        agencyId: agency._id,
    });
});

/* ===============================
   AGENCY DASHBOARD
================================ */
export const getAgencyDashboard = catchAsyncErrors(async (req, res) => {
    const agencyId = req.user._id;

    const totalModels = await Model.countDocuments({ agencyId });
    const activeBookings = await Booking.countDocuments({ agencyId, status: "active" });
    const totalEarnings = await Transaction.aggregate([
        { $match: { agencyId: agencyId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
        success: true,
        totalModels,
        activeBookings,
        totalEarnings: totalEarnings[0]?.total || 0,
    });
});

/* ===============================
   AGENCY PROFILE
================================ */
export const getAgencyProfile = catchAsyncErrors(async (req, res) => {
    const agency = await Agency.findById(req.user._id);
    if (!agency) {
        return res.status(404).json({ success: false, message: "Agency not found" });
    }
    res.json({
        success: true,
        agency,
    });
});

export const updateAgencyProfile = catchAsyncErrors(async (req, res) => {
    const agency = await Agency.findByIdAndUpdate(req.user._id, req.body, { new: true });
    if (!agency) {
        return res.status(404).json({ success: false, message: "Agency not found" });
    }
    res.json({
        success: true,
        message: "Profile updated",
        agency,
    });
});

/* ===============================
   AGENCY MODELS
================================ */
export const getAgencyModels = catchAsyncErrors(async (req, res) => {
    const models = await Model.find({ agencyId: req.user._id }).sort({ createdAt: -1 });
    res.json({
        success: true,
        models,
    });
});

export const addModel = catchAsyncErrors(async (req, res) => {
    const payload = req.body;
    payload.password = await bcrypt.hash(payload.password, 10);
    payload.agencyId = req.user._id; // Link to agency

    const model = await Model.create(payload);

    res.status(201).json({
        success: true,
        message: "Model added",
        model,
    });
});

/* ===============================
   AGENCY BOOKINGS
================================ */
export const getAgencyBookings = catchAsyncErrors(async (req, res) => {
    const bookings = await Booking.find({ agencyId: req.user._id }).sort({ date: -1 });
    res.json({
        success: true,
        bookings,
    });
});

/* ===============================
   AGENCY EARNINGS
================================ */
export const getAgencyEarnings = catchAsyncErrors(async (req, res) => {
    const transactions = await Transaction.find({ agencyId: req.user._id }).sort({ date: -1 });
    const total = await Transaction.aggregate([
        { $match: { agencyId: req.user._id } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
        success: true,
        transactions,
        total: total[0]?.total || 0,
    });
});

/* ===============================
   ADMIN: GET ALL AGENCIES
================================ */
export const getAgenciesAdmin = catchAsyncErrors(async (req, res) => {
    const agencies = await Agency.find().sort({ createdAt: -1 });

    res.json({
        success: true,
        agencies,
    });
});

/* ===============================
   ADMIN: GET SINGLE AGENCY
================================ */
export const getAgencyByIdAdmin = catchAsyncErrors(async (req, res) => {
    const agency = await Agency.findById(req.params.id);

    if (!agency) {
        return res.status(404).json({
            success: false,
            message: "Agency not found",
        });
    }

    res.json({
        success: true,
        agency,
    });
});

/* ===============================
   ADMIN: APPROVE / REJECT
================================ */
export const updateAgencyStatus = catchAsyncErrors(async (req, res) => {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid status",
        });
    }

    const agency = await Agency.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );

    if (!agency) {
        return res.status(404).json({
            success: false,
            message: "Agency not found",
        });
    }

    res.json({
        success: true,
        message: "Status updated",
        agency,
    });
});

/* ===============================
   ADMIN: UPDATE AGENCY
================================ */
export const updateAgencyAdmin = catchAsyncErrors(async (req, res) => {
    const agency = await Agency.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!agency) {
        return res.status(404).json({
            success: false,
            message: "Agency not found",
        });
    }

    res.json({
        success: true,
        message: "Agency updated",
        agency,
    });
});

/* ===============================
   ADMIN: DELETE AGENCY
================================ */
export const deleteAgencyAdmin = catchAsyncErrors(async (req, res) => {
    const agency = await Agency.findByIdAndDelete(req.params.id);

    if (!agency) {
        return res.status(404).json({
            success: false,
            message: "Agency not found",
        });
    }

    res.json({
        success: true,
        message: "Agency deleted",
    });
});


export const getPendingAgencies = catchAsyncErrors(async (req, res) => {
    const agencies = await Agency.find({ status: "pending" }).sort({
        createdAt: -1,
    });

    res.json({
        success: true,
        agencies,
    });
});