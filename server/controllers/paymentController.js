// controllers/paymentController.js
import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData, // sent from frontend
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ success: false });
    }

    // ✅ Save order
    const savedOrder = await Order.create({
      userId: orderData.userId,
      items: orderData.items,
      total: orderData.total,
      address: orderData.address,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      status: "PAID",
    });

    res.json({ success: true, orderId: savedOrder._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

