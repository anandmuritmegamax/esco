import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true, // e.g. "model.maxPortfolioImages"
        },
        value: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        type: {
            type: String,
            enum: ["string", "number", "boolean", "json"],
            default: "string",
        },
        group: {
            type: String,
            required: true, // e.g. "model", "payment", "seo"
        },
        description: String,
        isPublic: {
            type: Boolean,
            default: false, // frontend allowed?
        },
    },
    { timestamps: true }
);

export default mongoose.model("Setting", settingSchema);
