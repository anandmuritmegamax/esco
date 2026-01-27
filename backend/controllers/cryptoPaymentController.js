import axios from "axios";

export const createCryptoPayment = async (req, res) => {
    try {
        const { amount, orderId, customerId } = req.body;
        console.log("Creating crypto payment:", { amount, orderId, customerId });
        const response = await axios.post(
            "https://api.commerce.coinbase.com/charges",
            {
                name: "Order Payment",
                description: `Order ID: ${orderId}`,
                local_price: {
                    amount: amount,
                    currency: "USD",
                },
                pricing_type: "fixed_price",
                metadata: {
                    orderId,
                    customerId,
                },
                redirect_url: "http://localhost:3003/payment-success",
                cancel_url: "http://localhost:3003/payment-cancel",
            },
            {
                headers: {
                    "X-CC-Api-Key": "TCsS1yupmOWKwczuK7e2hFQxw1jEvhoc",
                    "X-CC-Version": "2018-03-22",
                    "Content-Type": "application/json",
                },
            }
        );

        res.json({
            success: true,
            paymentUrl: response.data.data.hosted_url,
            chargeId: response.data.data.id,
        });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ success: false, message: "Crypto payment failed" });
    }
};
