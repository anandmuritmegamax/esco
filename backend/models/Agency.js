import mongoose from "mongoose";

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

export default mongoose.model("Agency", AgencySchema);
