import bcrypt from "bcryptjs";
import Agency from "../models/Agency.js";

/* ===============================
   REGISTER AGENCY (PUBLIC)
================================ */
export const registerAgency = async (req, res) => {
    try {
        const payload = req.body;

        const exists = await Agency.findOne({
            $or: [{ username: payload.username }, { email: payload.email }],
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Username or email already exists",
            });
        }

        payload.password = await bcrypt.hash(payload.password, 10);

        const agency = await Agency.create(payload);

        res.status(201).json({
            success: true,
            message: "Agency submitted for review",
            agencyId: agency._id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

/* ===============================
   ADMIN: GET ALL AGENCIES
================================ */
export const getAgenciesAdmin = async (req, res) => {
    try {
        const agencies = await Agency.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            agencies,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch agencies",
        });
    }
};

/* ===============================
   ADMIN: GET SINGLE AGENCY
================================ */
export const getAgencyByIdAdmin = async (req, res) => {
    try {
        const agency = await Agency.findById(req.params.id);

        if (!agency) {
            return res.status(404).json({
                success: false,
                message: "Agency not found",
            });
        }

        res.json({
            success: true,
            agency,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch agency",
        });
    }
};

/* ===============================
   ADMIN: APPROVE / REJECT
================================ */
export const updateAgencyStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["pending", "approved", "rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }

        const agency = await Agency.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!agency) {
            return res.status(404).json({
                success: false,
                message: "Agency not found",
            });
        }

        res.json({
            success: true,
            message: "Status updated",
            agency,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to update status",
        });
    }
};

/* ===============================
   ADMIN: UPDATE AGENCY
================================ */
export const updateAgencyAdmin = async (req, res) => {
    try {
        const agency = await Agency.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!agency) {
            return res.status(404).json({
                success: false,
                message: "Agency not found",
            });
        }

        res.json({
            success: true,
            message: "Agency updated",
            agency,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to update agency",
        });
    }
};

/* ===============================
   ADMIN: DELETE AGENCY
================================ */
export const deleteAgencyAdmin = async (req, res) => {
    try {
        const agency = await Agency.findByIdAndDelete(req.params.id);

        if (!agency) {
            return res.status(404).json({
                success: false,
                message: "Agency not found",
            });
        }

        res.json({
            success: true,
            message: "Agency deleted",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to delete agency",
        });
    }
};


export const getPendingAgencies = async (req, res) => {
    try {
        const agencies = await Agency.find({ status: "pending" }).sort({
            createdAt: -1,
        });

        res.json({
            success: true,
            agencies,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch pending agencies",
        });
    }
};

