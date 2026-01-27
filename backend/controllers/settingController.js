import Setting from "../models/Setting.js";

/**
 * GET settings by group
 * /api/v1/admin/settings?group=platform
 */
export const getSettings = async (req, res) => {
    const { group } = req.query;

    const filter = group ? { group } : {};
    const settings = await Setting.find(filter).lean();

    const data = {};
    settings.forEach((s) => {
        data[s.key] = s.value;
    });

    res.json({
        success: true,
        settings: data,
    });
};

/**
 * UPDATE settings
 * body: { "platform.name": "Aayo", "email.fromEmail": "no-reply@x.com" }
 */
export const updateSettings = async (req, res) => {
    const updates = req.body;

    for (const fullKey in updates) {
        const value = updates[fullKey];

        // 🔑 Extract group from key
        // "platform.name" → "platform"
        const group = fullKey.split(".")[0];

        await Setting.findOneAndUpdate(
            { key: fullKey },
            {
                key: fullKey,
                value,
                group,
            },
            { upsert: true, new: true }
        );
    }

    res.json({
        success: true,
        message: "Settings updated successfully",
    });
};
