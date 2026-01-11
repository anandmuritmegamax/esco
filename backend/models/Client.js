import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Add this import

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

// Add pre-save hook for password hashing
ClientSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.model("Client", ClientSchema);