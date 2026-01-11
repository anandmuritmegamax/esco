import Payment from "../models/Payment.js";

export const cryptoWebhook = async (req, res) => {
    try {
        const payload = req.body;

        const {
            status,
            txid,
            amount,
            coin,
            custom,
        } = payload;

        // custom format: model:USERID:plancode
        const [userType, userId, planCode] = custom.split(":");

        let payment = await Payment.findOne({ transactionId: txid });

        if (!payment) {
            payment = await Payment.create({
                userType,
                userId,
                planCode,
                amount,
                currency: coin,
                transactionId: txid,
                status: status === "confirmed" ? "confirmed" : "pending",
                rawPayload: payload,
            });
        }

        if (status === "confirmed") {
            payment.status = "confirmed";
            await payment.save();
        }

        res.sendStatus(200);
    } catch (err) {
        console.error("Crypto webhook error:", err);
        res.sendStatus(500);
    }
};
