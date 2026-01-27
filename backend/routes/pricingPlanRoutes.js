import express from "express";
import {
    createPlan,
    getPlans,
    updatePlan,
    deletePlan,
    getPlanById,
} from "../controllers/pricingPlanController.js";

const router = express.Router();

router.route("/admin/pricing-plans")
    .get(getPlans)
    .post(createPlan);

router.route("/admin/pricing-plans/:id")
    .put(updatePlan)
    .delete(deletePlan);

router.route("/pricing-plans/:id")
    .get(getPlanById);
export default router;
