import mongoose from "mongoose";

const ModelLikeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        modelId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Model",
        },
    },
    { timestamps: true }
);

// 🚫 Prevent duplicate likes
ModelLikeSchema.index({ userId: 1, modelId: 1 }, { unique: true });

export default mongoose.model("ModelLike", ModelLikeSchema);
