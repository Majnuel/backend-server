import express from "express";
import { getOrderByUser } from "../api/orders";
import { retrieveUserData } from "../helpers/userDataFromReqObj";
import { logger } from "../services/logger";

export const orderByUser = async (
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
