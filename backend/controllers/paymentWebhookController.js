import Invoice from "../models/Invoice.js";

export const paymentWebhook = async (req, res) => {
    const { invoiceId, paymentId, status } = req.body;

    if (status === "paid") {
        await Invoice.findByIdAndUpdate(invoiceId, {
            paymentStatus: "paid",
            paymentId,
            paidAt: new Date(),
        });
    }

    res.json({ received: true });
};
