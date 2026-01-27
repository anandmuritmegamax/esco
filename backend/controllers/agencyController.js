import Agency from "../models/Agency.js";
import Model from "../models/Model.js";
import Booking from "../models/Booking.js";
import Transaction from "../models/Transaction.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { checkUserExistsEverywhere } from "../utils/checkUserExists.js";
import sendEmail from "../utils/sendEmail.js";



/* ===============================
   REGISTER AGENCY (PUBLIC)
================================ */
export const registerAgency = catchAsyncErrors(async (req, res) => {
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

    const exists = await Agency.findOne({
        $or: [{ username: payload.username }, { email: payload.email }],
    });

    if (exists) {
        return res.status(400).json({
            success: false,
            message: "Username or email already exists",
        });
    }

    // 🔐 Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    payload.emailOtp = {
        code: otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    };



    const agency = await Agency.create(payload); // password hashed in schema

    // 📧 Send OTP
    await sendEmail({
        to: agency.email,
        subject: "Verify your email – DubaiSociete",
        html: `
      <h2>Email Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 10 minutes.</p>
    `,
    });

    res.status(201).json({
        success: true,
        message: "Agency submitted for review",
        agencyId: agency._id,
        email: agency.email,
    });
});


export const verifyAgencyEmailOtp = async (req, res) => {
    const { email, otp } = req.body;

    const agency = await Agency.findOne({ email });

    if (!agency) {
        return res.status(404).json({ message: "Agency not found" });
    }

    if (!agency.emailOtp || agency.emailOtp.code !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    if (agency.emailOtp.expiresAt < new Date()) {
        return res.status(400).json({ message: "OTP expired" });
    }

    agency.emailVerified = true;
    agency.emailOtp = undefined;
    await agency.save();

    res.json({
        success: true,
        message: "Email verified successfully",
    });
};


/* ===============================
   AGENCY DASHBOARD
================================ */
export const getAgencyDashboard = catchAsyncErrors(async (req, res) => {
    const agencyId = req.user._id;

    const totalModels = await Model.countDocuments({ agencyId });

    const activeBookings = await Booking.countDocuments({
        agencyId,
        status: "active",
    });

    const earningsAgg = await Transaction.aggregate([
        { $match: { agencyId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
        success: true,
        totalModels,
        activeBookings,
        totalEarnings: earningsAgg[0]?.total || 0,
    });
});

/* ===============================
   AGENCY PROFILE
================================ */
export const getAgencyProfile = catchAsyncErrors(async (req, res) => {
    const agency = await Agency.findById(req.user._id).select("-password");

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

export const updateAgencyProfile = catchAsyncErrors(async (req, res) => {
    const allowedFields = [
        "agencyName",
        "phone",
        "website",
        "country",
        "city",
        "about",
    ];

    const updates = {};
    allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
            updates[field] = req.body[field];
        }
    });

    const agency = await Agency.findByIdAndUpdate(
        req.user._id,
        updates,
        { new: true }
    ).select("-password");

    if (!agency) {
        return res.status(404).json({
            success: false,
            message: "Agency not found",
        });
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
    const models = await Model.find({ agencyId: req.user._id })
        .sort({ createdAt: -1 });

    res.json({
        success: true,
        models,
    });
});

/* ===============================
   AGENCY → ADD MODEL
================================ */
export const addModel = catchAsyncErrors(async (req, res) => {
    const agencyId = req.user._id;
    const payload = req.body;

    // Required fields check
    if (!payload.username || !payload.password || !payload.email || !payload.stageName) {
        return res.status(400).json({
            success: false,
            message: "Required fields missing",
        });
    }

    // Unique check
    const exists = await Model.findOne({
        $or: [
            { username: payload.username },
            { email: payload.email },
        ],
    });

    if (exists) {
        return res.status(400).json({
            success: false,
            message: "Username or email already exists",
        });
    }

    const model = await Model.create({
        ...payload,
        agencyId,
        status: "pending", // always pending
    });

    res.status(201).json({
        success: true,
        message: "Model added successfully (Pending approval)",
        model,
    });
});

export const getAgencyModelById = async (req, res) => {
    const model = await Model.findOne({
        _id: req.params.id,
        agencyId: req.user._id, // 🔐 security
    });

    if (!model) {
        return res.status(404).json({ message: "Model not found" });
    }

    res.json({ model });
};

export const updateAgencyModel = async (req, res) => {
    const model = await Model.findOne({
        _id: req.params.id,
        agencyId: req.user._id, // 🔐 security
    });

    if (!model) {
        return res.status(404).json({
            success: false,
            message: "Model not found",
        });
    }

    /* 🔒 BLOCK AUTH FIELD UPDATES */
    delete req.body.username;
    delete req.body.password;
    delete req.body.email;

    /* ✅ UPDATE FIELDS */
    Object.keys(req.body).forEach((key) => {
        model[key] = req.body[key];
    });

    await model.save();

    res.json({
        success: true,
        model,
    });
};



/* ===============================
   AGENCY BOOKINGS
================================ */
export const getAgencyBookings = catchAsyncErrors(async (req, res) => {
    const bookings = await Booking.find({ agencyId: req.user._id })
        .sort({ createdAt: -1 })
        .populate("modelId", "stageName")
        .populate("clientId", "name");

    res.json({
        success: true,
        bookings,
    });
});

/* ===============================
   AGENCY EARNINGS
================================ */
export const getAgencyEarnings = catchAsyncErrors(async (req, res) => {
    const transactions = await Transaction.find({ agencyId: req.user._id })
        .sort({ createdAt: -1 });

    const totalAgg = await Transaction.aggregate([
        { $match: { agencyId: req.user._id } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
        success: true,
        transactions,
        total: totalAgg[0]?.total || 0,
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
   ADMIN: APPROVE / REJECT AGENCY
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

/* ===============================
   ADMIN: PENDING AGENCIES
================================ */
export const getPendingAgencies = catchAsyncErrors(async (req, res) => {
    const agencies = await Agency.find({ status: "pending" })
        .sort({ createdAt: -1 });

    res.json({
        success: true,
        agencies,
    });
});
