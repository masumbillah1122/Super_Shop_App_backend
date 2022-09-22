import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    seller: { type: String, required: true },
  },
  {
    timestamps: true, // for date
  }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
