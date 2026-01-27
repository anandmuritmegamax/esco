import Master from "../models/Master.js";

export const getMasters = async (req, res) => {
    const { type } = req.query;

    if (!type) {
        return res.status(400).json({ message: "type is required" });
    }

    const masters = await Master.find({
        type,
        isActive: true,
    }).sort({ sortOrder: 1 });

    res.json({ success: true, masters });
};

export const createMaster = async (req, res) => {
    const { type, label, value } = req.body;

    if (!type || !label || !value) {
        return res
            .status(400)
            .json({ message: "type, label and value are required" });
    }

    const master = await Master.create({
        type,
        label,
        value,
    });

    res.status(201).json({ success: true, master });
};

export const updateMaster = async (req, res) => {
    const master = await Master.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json({ success: true, master });
};

export const deleteMaster = async (req, res) => {
    await Master.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true });
};
