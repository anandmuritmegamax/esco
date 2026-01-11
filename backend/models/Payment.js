import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
    {
        userType: {
            type: String,
            enum: ["model", "agency"],
            required: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        planCode: {
            type: String, // standard / featured / vip
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        currency: {
            type: String, // BTC, USDT, ETH
            required: true,
        },

        transactionId: {
            type: String,
            unique: true,
        },

        status: {
            type: String,
            enum: ["pending", "confirmed", "failed"],
            default: "pending",
        },

        rawPayload: Object, // webhook raw data
    },
    { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
