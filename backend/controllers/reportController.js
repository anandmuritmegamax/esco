import Report from "../models/Report.js";
import Model from "../models/Model.js";

export const reportModel = async (req, res) => {
    try {
        const { reason } = req.body;

        if (!reason || reason.trim().length < 5) {
            return res.status(400).json({
                message: "Please provide a valid reason",
            });
        }
        console.log("user id", req.user)

        const report = await Report.create({
            modelId: req.params.id,
            reportedBy: req.user.id,
            reportedByModel: req.user.role === "admin"
                ? "User"
                : req.user.role.charAt(0).toUpperCase() + req.user.role.slice(1),
            reason,
        });



        res.json({
            success: true,
            message: "Report submitted successfully",
            report,
        });
    } catch (error) {
        res.status(500).json({ message: "Report failed" });
    }
};

export const getAdminReports = async (req, res) => {
    const { status } = req.query;

    const filter = {};
    if (status && status !== "all") {
        filter.status = status;
    }

    const reports = await Report.find(filter)
        .populate("reportedBy", "name email")
        .populate("modelId", "stageName")
        .sort({ createdAt: -1 });

    res.json(reports);
};

export const getPendingReports = async (req, res) => {
    const reports = await Report.find({ status: "pending" })
        .populate("reportedBy", "name email")
        .populate("modelId", "stageName");

    res.json(reports);
};

/* ADMIN: mark reviewed */
export const markReportReviewed = async (req, res) => {
    await Report.findByIdAndUpdate(req.params.id, {
        status: "reviewed",
    });

    res.json({ success: true });
};

/* ADMIN: reject */
export const rejectReport = async (req, res) => {
    await Report.findByIdAndUpdate(req.params.id, {
        status: "rejected",
    });

    res.json({ success: true });
};

export const getMyReports = async (req, res, next) => {
    const modelId = req.user._id;

    const reports = await Report.find({ modelId })
        .populate("reportedBy", "name email")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        reports,
    });
};