import Review from "../models/Review.js";

/* USER: submit review */
export const submitReview = async (req, res) => {
    const { rating, comment } = req.body;

    await Review.create({
        modelId: req.params.id,
        userId: req.user._id,
        userModel:
            req.user.role === "admin"
                ? "User"
                : req.user.role.charAt(0).toUpperCase() +
                req.user.role.slice(1),
        rating,
        comment,
    });

    res.json({ success: true });
};

export const getAdminReviews = async (req, res) => {
    const { status } = req.query;

    const filter = {};
    if (status && status !== "all") {
        filter.status = status;
    }

    const reviews = await Review.find(filter)
        .populate("userId", "name email")
        .populate("modelId", "stageName")
        .sort({ createdAt: -1 });

    res.json(reviews);
};


/* PUBLIC: get approved reviews */
export const getApprovedReviews = async (req, res) => {
    const reviews = await Review.find({
        modelId: req.params.id,
        status: "approved",
    }).populate("userId", "name");

    res.json(reviews);
};

/* ADMIN: list pending reviews */
export const getPendingReviews = async (req, res) => {
    const reviews = await Review.find({ status: "pending" })
        .populate("userId", "name email")
        .populate("modelId", "stageName");

    res.json(reviews);
};

/* ADMIN: approve */
export const approveReview = async (req, res) => {
    await Review.findByIdAndUpdate(req.params.id, {
        status: "approved",
    });
    res.json({ success: true });
};

/* ADMIN: reject */
export const rejectReview = async (req, res) => {
    await Review.findByIdAndUpdate(req.params.id, {
        status: "rejected",
    });
    res.json({ success: true });
};

export const getMyReviews = async (req, res, next) => {
    const modelId = req.user._id;

    const reviews = await Review.find({ modelId })
        .populate("userId", "name email")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        reviews,
    });
};
