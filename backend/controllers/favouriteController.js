import Favourite from "../models/Favourite.js";

// export const saveFavourite = async (req, res) => {
//     const userId = req.user._id;
//     const modelId = req.params.id;

//     const exists = await Favourite.findOne({ userId, modelId });

//     if (exists) {
//         return res.status(200).json({
//             success: false,
//             alreadySaved: true,
//             message: "Already in favourites",
//         });
//     }

//     await Favourite.create({ userId, modelId });

//     res.json({
//         success: true,
//         message: "Added to favourites",
//     });
// };


export const saveFavourite = async (req, res) => {
    try {
        const userId = req.user._id;
        const modelId = req.params.id;

        // Optional pre-check (extra safety)
        const exists = await Favourite.findOne({ userId, modelId });
        if (exists) {
            return res.status(200).json({
                success: false,
                alreadySaved: true,
                message: "Already saved to favourites",
            });
        }

        await Favourite.create({ userId, modelId });

        res.json({
            success: true,
            message: "Saved to favourites",
        });
    } catch (error) {
        // 🛑 Handle duplicate index error safely
        if (error.code === 11000) {
            return res.status(200).json({
                success: false,
                alreadySaved: true,
                message: "Already saved to favourites",
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to save favourite",
        });
    }
};
