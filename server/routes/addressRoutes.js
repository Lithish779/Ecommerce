import express from "express";
import Address from "../models/Address.js";

const router = express.Router();

// Save or Update Address
router.post("/save", async (req, res) => {
  try {
    const { userId, address } = req.body;

    let existing = await Address.findOne({ userId });

    if (existing) {
      existing = await Address.findOneAndUpdate(
        { userId },
        { ...address },
        { new: true }
      );
      return res.json({ success: true, message: "Address updated", address: existing });
    }

    const newAddress = await Address.create({ userId, ...address });

    res.json({ success: true, message: "Address saved", address: newAddress });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get User Saved Address
router.get("/:userId", async (req, res) => {
  try {
    const address = await Address.findOne({ userId: req.params.userId });
    res.json({ success: true, address });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
