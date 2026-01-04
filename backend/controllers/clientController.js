import bcrypt from "bcryptjs";
import Client from "../models/Client.js";

/* ================= PUBLIC REGISTER ================= */
export const registerClient = async (req, res) => {
    try {
        const payload = req.body;

        const exists = await Client.findOne({
            $or: [{ username: payload.username }, { email: payload.email }],
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Username or email already exists",
            });
        }

        payload.password = await bcrypt.hash(payload.password, 10);

        const client = await Client.create(payload);

        res.status(201).json({
            success: true,
            message: "Account created. Pending admin approval.",
            clientId: client._id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

/* ================= ADMIN: LIST ================= */
export const getClientsAdmin = async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            clients,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch clients",
        });
    }
};

/* ================= ADMIN: SINGLE ================= */
export const getClientByIdAdmin = async (req, res) => {
    const client = await Client.findById(req.params.id);

    if (!client) {
        return res.status(404).json({
            success: false,
            message: "Client not found",
        });
    }

    res.json({
        success: true,
        client,
    });
};

/* ================= ADMIN: APPROVE / REJECT ================= */
export const updateClientStatus = async (req, res) => {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid status",
        });
    }

    const client = await Client.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );

    if (!client) {
        return res.status(404).json({
            success: false,
            message: "Client not found",
        });
    }

    res.json({
        success: true,
        message: `Client ${status}`,
        client,
    });
};

/* ================= ADMIN: UPDATE ================= */
export const updateClientAdmin = async (req, res) => {
    const client = await Client.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!client) {
        return res.status(404).json({
            success: false,
            message: "Client not found",
        });
    }

    res.json({
        success: true,
        message: "Client updated",
        client,
    });
};

/* ================= ADMIN: DELETE ================= */
export const deleteClientAdmin = async (req, res) => {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
        return res.status(404).json({
            success: false,
            message: "Client not found",
        });
    }

    res.json({
        success: true,
        message: "Client deleted",
    });
};
