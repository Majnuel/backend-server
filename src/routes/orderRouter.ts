import express from "express";
import {
  currentUserOrders,
  allOrders,
  orderByUser
} from "../controllers/orders";
import { isLoggedIn } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

const orderRouter = express.Router();

orderRouter.get("/my-orders", isLoggedIn, currentUserOrders);

orderRouter.get("/all-orders", isAdmin, allOrders);

orderRouter.post("/order-by-user", isAdmin, orderByUser);

export { orderRouter };
