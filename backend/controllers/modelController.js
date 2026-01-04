import bcrypt from "bcryptjs";
import Model from "../models/Model.js";

/**
 * REGISTER MODEL
 */
export const registerModel = async (req, res) => {
    try {
        const payload = req.body;

        const exists = await Model.findOne({
            $or: [{ username: payload.username }, { email: payload.email }],
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Username or email already exists",
            });
        }

        payload.password = await bcrypt.hash(payload.password, 10);

        const model = await Model.create(payload);

        res.status(201).json({
            success: true,
            message: "Profile submitted for review",
            modelId: model._id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const getModelsAdmin = async (req, res) => {
    try {
        const models = await Model.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            models,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch models",
        });
    }
};


export const getModelByIdAdmin = async (req, res) => {
    try {
        const model = await Model.findById(req.params.id);

        if (!model) {
            return res.status(404).json({
                success: false,
                message: "Model not found",
            });
        }

        res.json({
            success: true,
            model,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch model",
        });
    }
};

export const updateModelStatus = async (req, res) => {
    try {
        const { status } = req.body; // "approved" | "rejected"

        if (!["approved", "rejected", "pending"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }

        const model = await Model.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!model) {
            return res.status(404).json({
                success: false,
                message: "Model not found",
            });
        }

        res.json({
            success: true,
            message: "Status updated",
            model,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to update status",
        });
    }
};


export const updateModelAdmin = async (req, res) => {
    try {
        const model = await Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!model) {
            return res.status(404).json({
                success: false,
                message: "Model not found",
            });
        }

        res.json({
            success: true,
            message: "Model updated",
            model,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to update model",
        });
    }
};
export const deleteModelAdmin = async (req, res) => {
    try {
        const model = await Model.findByIdAndDelete(req.params.id);

        if (!model) {
            return res.status(404).json({
                success: false,
                message: "Model not found",
            });
        }

        res.json({
            success: true,
            message: "Model deleted",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to delete model",
        });
    }
};


/**
 * PUBLIC: Get approved models
 * GET /api/v1/models
 */
export const getPublicModels = async (req, res) => {
    try {
        const { status = "approved" } = req.query;

        const filter = {};
        if (status) {
            filter.status = status;
        }

        const models = await Model.find(filter)
            .select(
                "stageName age based_in nationality profileImage portfolio tagline"
            )
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            models,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch models",
        });
    }
};

/**
 * PUBLIC: Get model by slug
 * GET /api/v1/model/:slug
 */
export const getPublicModelBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const model = await Model.findOne({
            slug,
            status: "approved",
        }).select("-password -email");

        if (!model) {
            return res.status(404).json({
                success: false,
                message: "Model not found",
            });
        }

        res.json({
            success: true,
            model,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch model",
        });
    }
};

