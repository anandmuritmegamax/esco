import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
    {
        modelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Model",
            required: true,
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            required: true,
        },
        agencyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Agency",
        },
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "active", "completed", "cancelled"],
            default: "pending",
        },
        amount: {
            type: Number,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);