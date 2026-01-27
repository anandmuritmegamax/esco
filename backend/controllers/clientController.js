import bcrypt from "bcryptjs";
import Client from "../models/Client.js";
import Model from "../models/Model.js";
import Booking from "../models/Booking.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { checkUserExistsEverywhere } from "../utils/checkUserExists.js";


/* ================= PUBLIC REGISTER ================= */
export const registerClient = catchAsyncErrors(async (req, res) => {
    const payload = req.body;

    const alreadyExists = await checkUserExistsEverywhere({
        email: payload.email,
    });

    if (alreadyExists) {
        return res.status(400).json({
            success: false,
            message: "User already registered",
        });
    }

    const exists = await Client.findOne({
        $or: [{ username: payload.username }, { email: payload.email }],
    });

    if (exists) {
        return res.status(400).json({
            success: false,
            message: "Username or email already exists",
        });
    }

    const client = await Client.create(payload);

    res.status(201).json({
        success: true,
        message: "Account created. Pending admin approval.",
        clientId: client._id,
    });
});

/* ================= CLIENT DASHBOARD ================= */
export const getClientDashboard = catchAsyncErrors(async (req, res) => {
    const clientId = req.user._id;

    const upcomingBookings = await Booking.countDocuments({ clientId, status: { $in: ["pending", "active"] } });
    const favoritesCount = req.user.favorites?.length || 0;
    const totalSpent = await Booking.aggregate([
        { $match: { clientId: clientId, status: "completed" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
        success: true,
        upcomingBookings,
        favoritesCount,
        totalSpent: totalSpent[0]?.total || 0,
    });
});

/* ================= CLIENT PROFILE ================= */
export const getClientProfile = catchAsyncErrors(async (req, res) => {
    const client = await Client.findById(req.user._id).select("-password");

    if (!client) {
        return res.status(404).json({ success: false, message: "Client not found" });
    }

    res.json({
        success: true,
        client,
    });
});

export const updateClientProfile = catchAsyncErrors(async (req, res) => {
    const client = await Client.findByIdAndUpdate(req.user._id, req.body, { new: true }).select("-password");

    if (!client) {
        return res.status(404).json({ success: false, message: "Client not found" });
    }

    res.json({
        success: true,
        message: "Profile updated",
        client,
    });
});

/* ================= BROWSE MODELS ================= */
export const getModels = catchAsyncErrors(async (req, res) => {
    const filter = { status: "approved" };
    // Add more filters based on req.query if needed (e.g., location, age)
    const models = await Model.find(filter).select("stageName age based_in nationality profileImage slug");

    res.json({
        success: true,
        models,
    });
});

/* ================= FAVORITES ================= */
export const getFavorites = catchAsyncErrors(async (req, res) => {
    const client = await Client.findById(req.user._id).populate("favorites", "stageName age based_in profileImage slug");

    res.json({
        success: true,
        favorites: client.favorites || [],
    });
});

export const addFavorite = catchAsyncErrors(async (req, res) => {
    const { modelId } = req.body;

    const client = await Client.findById(req.user._id);
    if (!client.favorites.includes(modelId)) {
        client.favorites.push(modelId);
        await client.save();
    }

    res.json({
        success: true,
        message: "Added to favorites",
    });
});

export const removeFavorite = catchAsyncErrors(async (req, res) => {
    const { modelId } = req.params;

    const client = await Client.findById(req.user._id);
    client.favorites = client.favorites.filter((id) => id.toString() !== modelId);
    await client.save();

    res.json({
        success: true,
        message: "Removed from favorites",
    });
});

/* ================= BOOKINGS ================= */
export const getBookings = catchAsyncErrors(async (req, res) => {
    const bookings = await Booking.find({ clientId: req.user._id }).populate("modelId", "stageName profileImage");

    res.json({
        success: true,
        bookings,
    });
});

export const createBooking = catchAsyncErrors(async (req, res) => {
    const { modelId, date, amount } = req.body;

    const booking = await Booking.create({
        modelId,
        clientId: req.user._id,
        date,
        amount,
        status: "pending",
    });

    res.status(201).json({
        success: true,
        message: "Booking requested",
        booking,
    });
});

/* ================= ADMIN: LIST ================= */
export const getClientsAdmin = catchAsyncErrors(async (req, res) => {
    const clients = await Client.find().sort({ createdAt: -1 });

    res.json({
        success: true,
        clients,
    });
});

/* ================= ADMIN: SINGLE ================= */
export const getClientByIdAdmin = catchAsyncErrors(async (req, res) => {
    const client = await Client.findById(req.params.id);

    if (!client) {
        return res.status(404).json({
            success: false,
            message: "Client not found",
        });
    }

    res.json({
        success: true,
        client,
    });
});

/* ================= ADMIN: APPROVE / REJECT ================= */
export const updateClientStatus = catchAsyncErrors(async (req, res) => {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid status",
        });
    }

    const client = await Client.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );

    if (!client) {
        return res.status(404).json({
            success: false,
            message: "Client not found",
        });
    }

    res.json({
        success: true,
        message: `Client ${status}`,
        client,
    });
});

/* ================= ADMIN: UPDATE ================= */
export const updateClientAdmin = catchAsyncErrors(async (req, res) => {
    const client = await Client.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!client) {
        return res.status(404).json({
            success: false,
            message: "Client not found",
        });
    }

    res.json({
        success: true,
        message: "Client updated",
        client,
    });
});

/* ================= ADMIN: DELETE ================= */
export const deleteClientAdmin = catchAsyncErrors(async (req, res) => {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
        return res.status(404).json({
            success: false,
            message: "Client not found",
        });
    }

    res.json({
        success: true,
        message: "Client deleted",
    });
});