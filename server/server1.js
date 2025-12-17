import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/Products11.js";          // renamed
import productSearchRoutes from "./routes/productRoutes.js"; // renamed
import productUpload from "./routes/productUpload.js";
import addressRoutes from "./routes/addressRoutes.js";

dotenv.config();

// Validate environment variable
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI missing in .env file");
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

// --- MongoDB Connect ---
mongoose
  .connect(process.env.MONGO_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("DB Error:", err));

mongoose.connection.on("error", err => {
  console.error("MongoDB runtime error:", err);
});

// --- Routes ---
app.use("/auth", authRoutes);
app.use("/products", productSearchRoutes);
app.use("/products", productsRoutes);         // main product routes
//app.use("/products", productSearchRoutes);    // search routes

app.use("/admin", productUpload);
app.use("/api/address", addressRoutes);

// --- Server ---
app.listen(4001, "0.0.0.0", () => {
  console.log("Server running on port 4001");
});
