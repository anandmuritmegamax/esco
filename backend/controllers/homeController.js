import Model from "../models/Model.js";

export const getHomeModels = async (req, res) => {
    try {
        const diamond = await Model.find({
            status: "approved",
            listing_type: "diamond",
        }).limit(15);

        const gold = await Model.find({
            status: "approved",
            listing_type: "gold",
        }).limit(35);

        const trending = await Model.find({
            status: "approved",
        })
            .sort({ createdAt: -1 })
            .limit(18);

        res.json({ diamond, gold, trending });
    } catch (e) {
        res.status(500).json({ error: "Home fetch failed" });
    }
};
