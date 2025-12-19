import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    total: { type: Number, required: true },
    address: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    status: { type: String, enum: ["PAID", "FAILED"], default: "PAID" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
