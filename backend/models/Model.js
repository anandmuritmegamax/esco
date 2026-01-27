import mongoose from "mongoose";
import slugify from "slugify";
import bcrypt from "bcryptjs";

/* MEDIA SCHEMA */
const MediaSchema = new mongoose.Schema(
    {
        url: { type: String, required: true },
        key: {
            type: String,
            //required: true 
        }, // ✅ S3 object key
        type: { type: String, enum: ["image", "video"], default: "image" },
        approved: { type: Boolean, default: false },
    },
    { timestamps: true } // ✅ keep _id
);

/* ADVERTISING / PLAN SCHEMA */
/* ADVERTISING / PLAN SCHEMA */
const AdvertisingSchema = new mongoose.Schema(
    {
        planId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PricingPlan",
            required: true,
        },

        planName: {
            type: String, // snapshot for history
            required: true,
        },

        cities: {
            type: [String],
            default: [],
        },

        amount: {
            type: Number,
            required: true,
        },

        currency: {
            type: String,
            default: "AED",
        },

        paymentId: {
            type: String,
            required: true,
        },

        orderId: {
            type: String,
            required: true,
        },

        invoiceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Invoice",
        },

        activatedAt: {
            type: Date,
            default: Date.now,
        },

        expiresAt: {
            type: Date,
            required: true,
        },
    },
    { _id: false }
);



/* MAIN MODEL SCHEMA */
const ModelSchema = new mongoose.Schema(
    {
        /* AUTH */
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true, lowercase: true },

        /* PROFILE HEADER */
        stageName: { type: String, required: true },
        tagline: String,
        age: { type: Number, min: 18 },
        based_in: String,
        nationality: String,

        /* SERVICES */
        services: [String],
        place_of_service: [String],
        profile_type: String,

        /* INFO CARD */
        height: String,
        weight: String,
        cup_size: String,
        price_1h: String,
        currency: String,

        /* PROFILE DETAILS */
        ethnicity: String,
        body_type: String,
        hair_color: String,
        eyes: String,
        languages: [String],
        location: String,

        /* AVAILABILITY */
        days: [String],
        availability_text: String,

        /* CONTACT */
        phone: String,
        website: String,
        preferred_contact: String,

        /* ABOUT */
        about_me: String,

        country: { type: String, required: true },
        city: { type: String, required: true },

        /* MEDIA */
        profileImage: MediaSchema,
        portfolio: [MediaSchema],

        /* ADVERTISING PLAN */
        advertising: AdvertisingSchema,

        /* STATUS */
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },

        listing_type: {
            type: String,
            enum: ["new", "gold", "diamond"],
            default: "new",
        },

        emailVerified: {
            type: Boolean,
            default: false,
        },

        emailOtp: {
            code: String,
            expiresAt: Date,
        },

        slug: { type: String, unique: true, index: true },

        agencyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Agency",
            // required: true,
        },
        likesCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

/* 🔐 Password hash */
ModelSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

/* 🔗 Slug generator */
ModelSchema.pre("save", function (next) {
    if (this.isModified("stageName")) {
        this.slug = slugify(this.stageName, { lower: true });
    }
    next();
});

export default mongoose.model("Model", ModelSchema);
