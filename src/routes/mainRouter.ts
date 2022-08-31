import express from "express";
const mainRouter = express.Router();
import { productsRouter } from "./productsRouter";
import { cartRouter } from "./cartRouter";
import { userRouter } from "./userRouter";
import { imageRouter } from "./imageRouter";
import swaggerUI from "swagger-ui-express";
import { orderRouter } from "./orderRouter";

const swaggerDocument = require("../../documentation.json");

//swagger:
mainRouter.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

mainRouter.get("/", (req, res) => {
  res.status(200).json({
    msg: "main API endpoint"
  });
});

mainRouter.use("/products", productsRouter);
mainRouter.use("/carts", cartRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/images", imageRouter);
mainRouter.use("/orders", orderRouter);

export { mainRouter };
