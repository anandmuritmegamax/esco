import crypto from "crypto";
import PricingPlan from "../models/pricingPlan.js";
import Invoice from "../models/Invoice.js";
import { generateInvoiceNo } from "../utils/generateInvoiceNo.js";
import Model from "../models/Model.js";
import razorpay from "../utils/razorpay.js";


/**
 * CREATE RAZORPAY ORDER
 */
export const createPayment = async (req, res) => {
    const { planId, cities, userId, userType } = req.body;

    if (!planId || !userId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    // 🔍 FETCH PLAN
    const plan = await PricingPlan.findById(planId);
    if (!plan || plan.status !== "active") {
        return res.status(400).json({ message: "Invalid or inactive plan" });
    }

    // 🔐 VALIDATE CITY LIMIT
    if (!Array.isArray(cities) || cities.length !== plan.cityLimit) {
        return res.status(400).json({
            message: `You must select exactly ${plan.cityLimit} cities`,
        });
    }

    // 💰 Razorpay amount (INR paise)
    const amount = plan.price * 100;

    // 🧾 CREATE RAZORPAY ORDER
    const order = await razorpay.orders.create({
        amount,
        currency: plan.currency || "INR",
        receipt: `order_${Date.now()}`,
        notes: {
            planId: plan._id.toString(),
            planName: plan.name,
            cities: cities.join(","),
            userId,
            userType,
        },
    });

    res.json({
        success: true,
        order,
        key: process.env.RAZORPAY_KEY_ID,
    });
};

/**
 * VERIFY RAZORPAY PAYMENT
 */
export const verifyPayment = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        planId,
        cities,
        userId,
        amount,
        currency,
    } = req.body;

    // 🔐 VERIFY SIGNATURE
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({
            success: false,
            message: "Payment verification failed",
        });
    }

    // 🔍 FETCH PLAN
    const plan = await PricingPlan.findById(planId);
    if (!plan) {
        return res.status(404).json({ message: "Plan not found" });
    }

    // 🧾 CREATE INVOICE
    const invoice = await Invoice.create({
        invoiceNo: generateInvoiceNo(),
        userId,
        userType: "model",
        planId: plan._id,
        planName: plan.name,
        amount,
        currency,
        cities,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        status: "paid",
    });

    // 🔐 ACTIVATE PLAN FOR MODEL
    await Model.findByIdAndUpdate(userId, {
        advertising: {
            planId: plan._id,
            planName: plan.name,
            cities,
            amount,
            currency,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            invoiceId: invoice._id,
            activatedAt: new Date(),
            expiresAt: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
            ),
        },
    });

    res.json({
        success: true,
        message: "Payment verified successfully",
        invoiceId: invoice._id,
    });
};

// export const createPayment = async (req, res) => {
//     const { planCode, amount, userType, userId } = req.body;

//     // 1️⃣ Create invoice first
//     const invoice = await Invoice.create({
//         invoiceNo: generateInvoiceNo(),
//         userType,
//         userId,
//         planCode,
//         planName: planCode.toUpperCase(),
//         amount,
//     });

//     // 2️⃣ Create MyCryptoCheckout payment (pseudo)
//     const paymentUrl = `https://mycryptocheckout.com/pay/${invoice._id}`;

//     res.json({
//         success: true,
//         paymentUrl,
//         invoiceId: invoice._id,
//     });
// };

// export const createCryptoPayment = async (req, res) => {
//     const { planCode, amount, userType, userId } = req.body;

//     // MyCryptoCheckout redirect URL
//     const paymentUrl = `https://mycryptocheckout.com/?amount=${amount}&custom=${userType}:${userId}:${planCode}`;

//     res.json({
//         success: true,
//         paymentUrl,
//     });
// };
