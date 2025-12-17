import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// ------------------------------------
// PRODUCT SEARCH (by description/title)
// ------------------------------------
console.log(">>> productRoutes LOADED");

router.get("/search/:keyword", async (req, res) => {
  try {
    const keyword = req.params.keyword;

    if (!keyword.trim()) {
      return res.json([]);
    }

    const results = await Product.find({
      $or: [
        { description: { $regex: keyword, $options: "i" } },
        { title: { $regex: keyword, $options: "i" } } // safe fallback
      ]
    }).limit(20);

    res.json(results);
  } catch (error) {
    console.error("Search API Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
