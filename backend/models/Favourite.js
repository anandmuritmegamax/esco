import mongoose from "mongoose";

const FavouriteSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        modelId: { type: mongoose.Schema.Types.ObjectId, ref: "Model", required: true },
    },
    { timestamps: true }
);

FavouriteSchema.index({ userId: 1, modelId: 1 }, { unique: true });

export default mongoose.model("Favourite", FavouriteSchema);
