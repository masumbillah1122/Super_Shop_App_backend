import express from "express";
import ProductController from "../controller/ProductController.js";

const ProductRouter = express.Router();
ProductRouter.get("/all", ProductController.getAllProduct);

export default ProductRouter;
