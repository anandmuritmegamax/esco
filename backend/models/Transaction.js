import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
    {
        agencyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Agency",
        },
        modelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Model",
        },
        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
        },
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        source: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);