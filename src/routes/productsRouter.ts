import express from "express";
const productsRouter = express.Router();
import { isAdmin } from "../middlewares/isAdmin";
import {
  getProducts,
  createProduct,
  deleteByID,
  updateProduct
} from "../controllers/products";
import { checkBodyProduct } from "../middlewares/checkBodyProduct";
import expressAsyncHandler from "express-async-handler";

productsRouter.get("/:id?", expressAsyncHandler(getProducts));
productsRouter.post(
  "/",
  isAdmin,
  checkBodyProduct,
  expressAsyncHandler(createProduct)
);
productsRouter.delete("/:id", isAdmin, expressAsyncHandler(deleteByID));
productsRouter.put(
  "/:id",
  isAdmin,
  checkBodyProduct,
  expressAsyncHandler(updateProduct)
);

export { productsRouter };
