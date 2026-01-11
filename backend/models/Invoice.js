import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
    {
        invoiceNo: { type: String, unique: true },

        userType: {
            type: String,
            enum: ["model", "agency"],
            required: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "userType",
        },

        planCode: String,
        planName: String,

        amount: Number,
        currency: { type: String, default: "AED" },

        paymentProvider: {
            type: String,
            default: "mycryptocheckout",
        },

        paymentId: String, // returned by MyCryptoCheckout
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },

        issuedAt: { type: Date, default: Date.now },
        paidAt: Date,
    },
    { timestamps: true }
);

export default mongoose.model("Invoice", InvoiceSchema);
