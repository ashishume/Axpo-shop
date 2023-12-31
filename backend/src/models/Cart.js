const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Product schema
const cartSchema = new mongoose.Schema({
  product: { type: Schema.Types.ObjectId, ref: "product" },
  quantity: { type: Number },
  price: { type: Number },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

// Create the User model
const User = mongoose.model("cart", cartSchema);

module.exports = User;
