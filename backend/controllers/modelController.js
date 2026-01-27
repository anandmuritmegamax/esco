import bcrypt from "bcryptjs";
import Model from "../models/Model.js";
import Booking from "../models/Booking.js";
import Transaction from "../models/Transaction.js";
import { upload_file, delete_file } from "../utils/cloudinary.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import slugify from "slugify";
import ModelLike from "../models/ModelLike.js";
import Favourite from "../models/Favourite.js";
import Review from "../models/Review.js";
import sendEmail from "../utils/sendEmail.js";
import { checkUserExistsEverywhere } from "../utils/checkUserExists.js";


/**
 * REGISTER MODEL
 */
export const registerModel = catchAsyncErrors(async (req, res) => {
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

    const exists = await Model.findOne({
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
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    };

    payload.slug = slugify(payload.stageName, { lower: true });

    const model = await Model.create(payload);

    // 📧 Send OTP Email
    await sendEmail({
        to: model.email,
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
        message: "OTP sent to email",
        modelId: model._id,
        email: model.email,
    });
});

/**
 * MODEL DASHBOARD
 */
export const getModelDashboard = catchAsyncErrors(async (req, res) => {
    const modelId = req.user._id;

    /* ================= EXISTING STATS ================= */
    const totalBookings = await Booking.countDocuments({ modelId });
    const activeBookings = await Booking.countDocuments({
        modelId,
        status: "active",
    });
    const profileViews = req.user.profileViews || 0;

    /* ================= PROFILE STATUS ================= */
    const profileStatus = req.user.status; // pending | approved | rejected
    console.log("status", profileStatus);
    /* ================= PLAN STATUS ================= */
    let planInfo = null;

    if (req.user.advertising && req.user.advertising.expiresAt) {
        const now = new Date();
        const expiry = new Date(req.user.advertising.expiresAt);

        const diffTime = expiry - now;
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let status = "active";
        if (daysLeft <= 0) status = "expired";
        else if (daysLeft <= 5) status = "expiring";

        planInfo = {
            planId: req.user.advertising.planId,
            planName: req.user.advertising.planName,
            expiresAt: req.user.advertising.expiresAt,
            daysLeft,
            status, // active | expiring | expired
        };
    }

    res.json({
        success: true,

        /* OLD DATA (unchanged) */
        totalBookings,
        activeBookings,
        profileViews,

        /* NEW DATA */
        profileStatus,
        planInfo,
    });
});

// export const getModelDashboard = catchAsyncErrors(async (req, res) => {
//     const modelId = req.user._id;

//     const totalBookings = await Booking.countDocuments({ modelId });
//     const activeBookings = await Booking.countDocuments({ modelId, status: "active" });
//     const profileViews = req.user.profileViews || 0; // Assuming profileViews field added

//     res.json({
//         success: true,
//         totalBookings,
//         activeBookings,
//         profileViews,
//     });
// });

/**
 * MODEL PROFILE GET
 */
export const getModelProfile = catchAsyncErrors(async (req, res) => {
    if (req.role !== "model") {
        return res.status(403).json({
            success: false,
            message: "Access denied",
        });
    }

    const model = req.user;
    model.password = undefined;

    res.json({
        success: true,
        model,
    });
});



/**
 * MODEL PROFILE UPDATE
 */
export const updateModelProfile = catchAsyncErrors(async (req, res) => {
    const allowedFields = [
        "stageName",
        "tagline",
        "age",
        "based_in",
        "nationality",
        "services",
        "place_of_service",
        "profile_type",
        "height",
        "weight",
        "cup_size",
        "price_1h",
        "currency",
        "ethnicity",
        "body_type",
        "hair_color",
        "eyes",
        "pubic_hair",
        "meeting_with",
        "languages",
        "location",
        "rate_30_out",
        "rate_30_in",
        "rate_1h_out",
        "rate_1h_in",
        "rate_2h_out",
        "rate_2h_in",
        "rate_note",
        "days",
        "availability_text",
        "phone",
        "website",
        "snapchat",
        "preferred_contact",
        "about_me",
        "profileImage",
        "portfolio",
    ];

    const updates = {};
    allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
            updates[field] = req.body[field];
        }
    });

    const model = await Model.findByIdAndUpdate(
        req.user._id,
        updates,
        { new: true }
    ).select("-password");

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
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded",
        });
    }

    const { isProfile, type } = req.body;
    const file = req.file;

    /* ================= UPLOAD TO STORAGE ================= */
    // upload_file should accept buffer + mimetype
    const uploadResponse = await upload_file(
        file.buffer,
        "model_portfolio",
        file.mimetype
    );

    const model = await Model.findById(req.user._id);

    if (!model) {
        return res.status(404).json({
            success: false,
            message: "Model not found",
        });
    }

    /* ================= PROFILE IMAGE ================= */
    if (isProfile === "true") {
        model.profileImage = {
            url: uploadResponse.url,
            key: uploadResponse.key || uploadResponse.public_id,
            type: "image",
            approved: false,
        };
    }
    /* ================= PORTFOLIO ================= */
    else {
        model.portfolio.push({
            url: uploadResponse.url,
            key: uploadResponse.key || uploadResponse.public_id,
            type: type === "video" ? "video" : "image",
            approved: false,
        });
    }

    await model.save();

    res.status(200).json({
        success: true,
        message: "Media uploaded successfully",
    });
});

// export const uploadMedia = catchAsyncErrors(async (req, res) => {
//     const { image } = req.body; // Assume base64 or url
//     const uploadResponse = await upload_file(image, "model_portfolio");

//     const model = await Model.findById(req.user._id);
//     model.portfolio.push({
//         url: uploadResponse.url,
//         public_id: uploadResponse.public_id,
//         type: "image", // or video
//     });
//     await model.save();

//     res.json({
//         success: true,
//         message: "Media uploaded",
//     });
// });

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
            message: "Model not foundkkkkkkkkkkkkkkkkkk",
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
            message: "Model not founduuuuuuuuuuuuuuuu",
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
            message: "Model not foundnnnnnnnnnnnnnnnnn",
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
            message: "Model not foundmmmmmmmmmmmmm",
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
// export const getPublicModels = catchAsyncErrors(async (req, res) => {
//     const { status = "approved" } = req.query;

//     const filter = {};
//     if (status) {
//         filter.status = status;
//     }

//     const models = await Model.find(filter)
//         .select(
//             "stageName age based_in nationality profileImage portfolio tagline"
//         )
//         .sort({ createdAt: -1 });

//     res.json({
//         success: true,
//         models,
//     });
// });

export const getPublicModels = async (req, res) => {
    const planPriority = {
        diamond: 1,
        vip: 2,
        gold: 3,
        new: 4,
        free: 5,
    };
    console.log("plan", planPriority);

    const models = await Model.find({ status: "approved" }).lean();

    models.sort((a, b) => {
        const aPriority = planPriority[a.listing_type] ?? 99;
        const bPriority = planPriority[b.listing_type] ?? 99;
        return aPriority - bPriority;
    });

    res.json({ success: true, models });
};


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
            message: "Model not founaaaaaaaaaaaaaad",
        });
    }

    res.json({
        success: true,
        model,
    });
});

// controllers/modelController.js
// export const likeModel = async (req, res) => {
//     try {
//         const model = await Model.findByIdAndUpdate(
//             req.params.id,
//             { $inc: { likesCount: 1 } },
//             { new: true } // return updated doc
//         );

//         res.json({ likes: model.likesCount });
//     } catch (error) {
//         res.status(500).json({ message: "Like failed" });
//     }
// };

export const likeModel = async (req, res) => {
    const userId = req.user._id;
    const modelId = req.params.id;

    // Check if already liked
    const alreadyLiked = await ModelLike.findOne({ userId, modelId });

    if (alreadyLiked) {
        return res.status(200).json({
            success: false,
            alreadyLiked: true,
            message: "You already liked this profile",
        });
    }

    // Save like
    await ModelLike.create({ userId, modelId });

    // Increment counter safely
    const model = await Model.findByIdAndUpdate(
        modelId,
        { $inc: { likesCount: 1 } },
        { new: true }
    );

    res.json({
        success: true,
        likes: model.likesCount,
    });
};


export const getUserModelStatus = async (req, res) => {
    const userId = req.user._id;
    const modelId = req.params.id;

    const liked = await ModelLike.exists({ userId, modelId });
    const favourite = await Favourite.exists({ userId, modelId });

    res.json({
        liked: !!liked,
        favourite: !!favourite,
    });
};

export const getApprovedReviews = async (req, res) => {
    const reviews = await Review.find({
        modelId: req.params.id,
        status: "approved",
    }).populate("userId", "name");

    res.json(reviews);
};

export const verifyModelEmailOtp = async (req, res) => {
    const { email, otp } = req.body;

    const model = await Model.findOne({ email });

    if (!model) {
        return res.status(404).json({ message: "Model not found" });
    }

    if (!model.emailOtp || model.emailOtp.code !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    if (model.emailOtp.expiresAt < new Date()) {
        return res.status(400).json({ message: "OTP expired" });
    }

    model.emailVerified = true;
    model.emailOtp = undefined;
    await model.save();

    res.json({
        success: true,
        message: "Email verified successfully",
    });
};
