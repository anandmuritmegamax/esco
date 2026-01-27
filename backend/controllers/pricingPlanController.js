import PricingPlan from "../models/pricingPlan.js";

/* ================= CREATE PLAN ================= */
export const createPlan = async (req, res) => {
    try {
        const plan = await PricingPlan.create(req.body);
        res.status(201).json({ success: true, plan });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

/* ================= GET ALL PLANS ================= */
export const getPlans = async (req, res) => {
    const plans = await PricingPlan.find().sort({ priorityLevel: 1 });
    res.json({ success: true, plans });
};

/* ================= UPDATE PLAN ================= */
export const updatePlan = async (req, res) => {
    const plan = await PricingPlan.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!plan) {
        return res.status(404).json({ success: false, message: "Plan not found" });
    }

    res.json({ success: true, plan });
};

/* ================= DELETE PLAN ================= */
export const deletePlan = async (req, res) => {
    const plan = await PricingPlan.findById(req.params.id);

    if (!plan) {
        return res.status(404).json({ success: false, message: "Plan not found" });
    }

    await plan.deleteOne();
    res.json({ success: true, message: "Plan deleted" });
};


export const getPlanById = async (req, res) => {
    console.log("plan id", req.params.id);
    const plan = await PricingPlan.findById(req.params.id);
    if (!plan) {
        return res.status(404).json({ message: "Plan not found" });
    }
    res.json({ success: true, plan });
};

