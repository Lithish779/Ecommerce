import express from "express";
import { Usera } from "./models/Usera.js";

const router = express.Router();

// Get all addresses
router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.json(user.addresses);
});

// Add new address
router.post("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (req.body.isDefault) {
    user.addresses.forEach(a => (a.isDefault = false));
  }

  user.addresses.push(req.body);
  await user.save();

  res.json(user.addresses);
});

// Set default address
router.put("/:userId/default/:addressId", async (req, res) => {
  const user = await User.findById(req.params.userId);

  user.addresses.forEach(a => {
    a.isDefault = a._id.toString() === req.params.addressId;
  });

  await user.save();
  res.json(user.addresses);
});

// Delete address
router.delete("/:userId/:addressId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  user.addresses = user.addresses.filter(
    a => a._id.toString() !== req.params.addressId
  );
  await user.save();
  res.json(user.addresses);
});

export default router;
