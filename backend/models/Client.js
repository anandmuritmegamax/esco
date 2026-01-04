import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, lowercase: true, trim: true },
        password: { type: String, required: true },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Client", ClientSchema);
