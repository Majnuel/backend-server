import express from "express";
import { getAllOrders, getOrderByUser } from "../api/orders";
import { retrieveUserData } from "../helpers/userDataFromReqObj";
import { logger } from "../services/logger";

export const currentUserOrders = async (
  req: express.Request,
  res: express.Response
) => {
  const userData = retrieveUserData(req);
  try {
    const order = await getOrderByUser(userData._id.toString());
    if (!order.length) {
      res.status(400).json({ msg: "you have no orders in queue" });
    } else res.status(200).json({ orders: order });
  } catch (err) {
    logger.error(err);
  }
};

export const allOrders = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const allOrders = await getAllOrders();
    res.status(200).json({ orders: allOrders });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ msg: "there has been an error" });
  }
};

export const orderByUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.body.userId;
    const orders = await getOrderByUser(userId);
    if (!orders.length) {
      res.status(400).json({ msg: `there are no orders for user ${userId}` });
    } else res.status(200).json({ orders: orders });
  } catch (err) {
    logger.error(err);
  }
};
