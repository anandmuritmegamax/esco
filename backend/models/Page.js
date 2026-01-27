import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },

        content: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
        },

        seo: {
            metaTitle: {
                type: String,
                trim: true,
            },
            metaDescription: {
                type: String,
                trim: true,
            },
            keywords: [
                {
                    type: String,
                    trim: true,
                },
            ],
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        publishedAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Page", pageSchema);
