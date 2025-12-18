import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";   // OTP + Login routes
import productRoutes from "./routes/productRoutes.js";
import productsRoutes from "./routes/Products11.js";
import productUpload from "./routes/productUpload.js";
import addressRoutes from "./routes/addressRoutes.js";

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= MONGODB ================= */
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI missing in .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(" MongoDB Error:", err));

/* ================= ROUTES ================= */
app.use("/auth", authRoutes);        // signup, otp, login
app.use("/products", productRoutes);
app.use("/products", productsRoutes);
app.use("/admin", productUpload);
app.use("/api/address", addressRoutes);

/* ================= SERVER ================= */
const PORT = process.env.PORT || 4001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(` Server running on port ${PORT}`);
});