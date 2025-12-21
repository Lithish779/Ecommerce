import express from "express";
import Address from "../models/Address.js";

const router = express.Router();

// Create a new address
router.post("/", async (req, res) => {
  try {
    const { userId, fullName, phone, street, city, state, pincode, isDefault } = req.body;
    if (!userId) return res.status(400).json({ success: false, error: "userId required" });

    if (isDefault) {
      await Address.updateMany({ userId }, { $set: { isDefault: false } });
    }

    const newAddress = await Address.create({ userId, fullName, phone, street, city, state, pincode, isDefault: !!isDefault });

    res.json({ success: true, message: "Address saved", address: newAddress });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// List addresses for a user
router.get("/:userId", async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.params.userId }).sort({ isDefault: -1, updatedAt: -1 });
    res.json({ success: true, addresses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update an address
router.put("/:addressId", async (req, res) => {
  try {
    const { addressId } = req.params;
    const update = req.body;

    if (update.isDefault) {
      const addr = await Address.findById(addressId);
      if (!addr) return res.status(404).json({ success: false, error: "Address not found" });
      await Address.updateMany({ userId: addr.userId }, { $set: { isDefault: false } });
    }

    const updated = await Address.findByIdAndUpdate(addressId, update, { new: true });
    res.json({ success: true, address: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Set an address as default
router.put("/:addressId/default", async (req, res) => {
  try {
    const { addressId } = req.params;
    const addr = await Address.findById(addressId);
    if (!addr) return res.status(404).json({ success: false, error: "Address not found" });

    await Address.updateMany({ userId: addr.userId }, { $set: { isDefault: false } });
    addr.isDefault = true;
    await addr.save();

    res.json({ success: true, address: addr });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete an address
router.delete("/:addressId", async (req, res) => {
  try {
    const { addressId } = req.params;
    const addr = await Address.findByIdAndDelete(addressId);
    if (!addr) return res.status(404).json({ success: false, error: "Address not found" });

    // If deleted address was default, optionally set another address as default
    if (addr.isDefault) {
      const another = await Address.findOne({ userId: addr.userId });
      if (another) {
        another.isDefault = true;
        await another.save();
      }
    }

    res.json({ success: true, message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
