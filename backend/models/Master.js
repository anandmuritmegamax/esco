import mongoose from "mongoose";

const masterSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true, // "languages", "skills", "bodyTypes"
            index: true,
        },
        label: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        sortOrder: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Master", masterSchema);
