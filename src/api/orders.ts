import { OrderDirection, orderModel } from "../models/orders";

export const newOrder = (userID: String, products: []) => {
  const extractProducts = (products: any) => {
    return products[0].products;
  };

  orderModel.create({
    user: userID,
    products: extractProducts(products),
    orderStatus: OrderDirection.generado
  });
};
