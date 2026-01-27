import mongoose from "mongoose";

const pricingPlanSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
        },

        currency: {
            type: String,
            default: "USD",
        },

        billingCycle: {
            type: String,
            enum: ["monthly", "yearly"],
            default: "monthly",
        },

        priorityLevel: {
            type: Number,
            default: 1,
        },

        cityLimit: {
            type: Number,
            required: true,
        },

        features: [
            {
                type: String,
                trim: true,
            },
        ],

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true }
);

export default mongoose.model("PricingPlan", pricingPlanSchema);
