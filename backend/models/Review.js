import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "userModel",
        },

        userModel: {
            type: String,
            required: true,
            enum: ["User", "Client", "Agency", "Model"],
        },
        modelId: { type: mongoose.Schema.Types.ObjectId, ref: "Model", required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: String,
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema);
