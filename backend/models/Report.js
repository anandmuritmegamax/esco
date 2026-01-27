import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
    {
        modelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Model",
            required: true,
        },
        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "reportedByModel",
        },
        reportedByModel: {
            type: String,
            required: true,
            enum: ["User", "Client", "Agency", "Model"],
        },
        reason: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["pending", "reviewed", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Report", ReportSchema);
