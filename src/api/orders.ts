import { OrderDirection, orderModel } from "../models/orders";

export const newOrder = (userID: String, products: []) => {
  const extractProducts = (products: any) => {
    return products[0].products;
  };
  const computeTotal = (products: []) => {
    let total: number = 0;
    products.forEach((product: any) => {
      total += product.price * product.quantity;
    });
    return total;
  };

  orderModel.create({
    user: userID,
    products: extractProducts(products),
    orderStatus: OrderDirection.generado,
    orderTotal: computeTotal(extractProducts(products))
  });
};

export const getOrderByUser = (userId: string) =>
  orderModel.find({ user: userId });

export const getAllOrders = () => orderModel.find();
