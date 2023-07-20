const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Create and save a new cart
router.post("/cart", async (req, res) => {
  try {
    const { items, user } = req.body;
    const newCart = new Cart({ items, user });
    await newCart.save();
    res.status(201).json({ message: "cart updated", cart: req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cartData = await Cart.find({ user: id }).populate({
      path: "items.product", //fetches the whole data from product table
      select: "-__v -_id", //excludes these values while fetching from product table
    });
    res.status(200).json(cartData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true } // Return the updated cart and run validators
    );
    if (!updatedCart) {
      return res.status(404).json({ message: "cart not found" });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
