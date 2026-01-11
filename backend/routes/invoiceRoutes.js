import express from "express";
import Invoice from "../models/Invoice.js";
import { generateInvoicePDF } from "../services/invoicePdfService.js";

const router = express.Router();

router.get("/:id/download", async (req, res) => {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).end();

    const filePath = generateInvoicePDF(invoice);
    res.download(filePath);
});

export default router;
