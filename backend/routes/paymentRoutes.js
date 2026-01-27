import express from "express";
import {
    createPayment,
    verifyPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/payments/create", createPayment);
router.post("/payments/verify", verifyPayment);

export default router;
