import Invoice from "../models/Invoice.js";
import { generateInvoiceNo } from "../utils/generateInvoiceNo.js";

export const createPayment = async (req, res) => {
    const { planCode, amount, userType, userId } = req.body;

    // 1️⃣ Create invoice first
    const invoice = await Invoice.create({
        invoiceNo: generateInvoiceNo(),
        userType,
        userId,
        planCode,
        planName: planCode.toUpperCase(),
        amount,
    });

    // 2️⃣ Create MyCryptoCheckout payment (pseudo)
    const paymentUrl = `https://mycryptocheckout.com/pay/${invoice._id}`;

    res.json({
        success: true,
        paymentUrl,
        invoiceId: invoice._id,
    });
};

export const createCryptoPayment = async (req, res) => {
    const { planCode, amount, userType, userId } = req.body;

    // MyCryptoCheckout redirect URL
    const paymentUrl = `https://mycryptocheckout.com/?amount=${amount}&custom=${userType}:${userId}:${planCode}`;

    res.json({
        success: true,
        paymentUrl,
    });
};
