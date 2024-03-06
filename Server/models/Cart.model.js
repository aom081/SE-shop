const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ProductSchema = new Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CartModel = model("Cart", ProductSchema);

module.exports = CartModel;
