import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Add this import

const AgencySchema = new mongoose.Schema(
    {
        /* AUTH */
        username: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true },
        email: { type: String, required: true, lowercase: true, trim: true },

        /* AGENCY INFO */
        agencyName: { type: String, required: true },
        phone: String,
        website: String,
        country: String,
        city: String,
        about: String,

        /* STATUS */
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

// Add pre-save hook for password hashing
AgencySchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.model("Agency", AgencySchema);