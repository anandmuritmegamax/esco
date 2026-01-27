import express from "express";
import { createCryptoPayment } from "../controllers/cryptoPaymentController.js";
import { cryptoWebhook } from "../controllers/cryptoWebhookController.js";

const router = express.Router();

router.post("/crypto/create", createCryptoPayment);
router.post("/webhook", cryptoWebhook);

export default router;
