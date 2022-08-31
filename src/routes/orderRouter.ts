import express from "express";
import { getOrderByUser } from "../api/orders";
import { orderByUser } from "../controllers/orders";
import { isLoggedIn } from "../middlewares/auth";

const orderRouter = express.Router();

orderRouter.get("/my-order", isLoggedIn, orderByUser);

export { orderRouter };
