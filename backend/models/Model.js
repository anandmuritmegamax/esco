import mongoose from "mongoose";
import slugify from "slugify";
import bcrypt from "bcryptjs"; // Add this import
/* MEDIA SCHEMA */
const MediaSchema = new mongoose.Schema(
    {
        url: { type: String, required: true },
        type: { type: String, enum: ["image", "video"], default: "image" },
        approved: { type: Boolean, default: false },
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
        pubic_hair: String,
        meeting_with: String,
        languages: [String],
        location: String,

        /* RATES */
        rate_30_out: String,
        rate_30_in: String,
        rate_1h_out: String,
        rate_1h_in: String,
        rate_2h_out: String,
        rate_2h_in: String,
        rate_note: String,

        /* AVAILABILITY */
        days: [String],
        availability_text: String,

        /* CONTACT */
        phone: String,
        website: String,
        snapchat: String,
        preferred_contact: String,

        /* ABOUT */
        about_me: String,

        /* MEDIA */
        profileImage: MediaSchema,
        portfolio: [MediaSchema],

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
        slug: {
            type: String,
            unique: true,
            index: true,
        },
        agencyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Agency",
        },
    },
    { timestamps: true }
);

// Add pre-save hook for password hashing
ModelSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.model("Model", ModelSchema);