import crypto from "crypto";

export const cryptoWebhook = (req, res) => {
    const signature = req.headers["x-cc-webhook-signature"];
    const payload = JSON.stringify(req.body);

    const expectedSignature = crypto
        .createHmac("sha256", process.env.COINBASE_WEBHOOK_SECRET)
        .update(payload)
        .digest("hex");

    if (signature !== expectedSignature) {
        return res.status(400).send("Invalid signature");
    }

    const event = req.body.event;

    if (event.type === "charge:confirmed") {
        const { orderId, customerId } = event.data.metadata;

        // ✅ Update DB
        // mark order as PAID
        console.log("Payment confirmed for order:", orderId);
    }

    res.status(200).send("Webhook handled");
};
