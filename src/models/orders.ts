const mongoose = require("mongoose");

const ordersCollection = "orders";

export enum OrderDirection {
  generado = "generado",
  pagado = "pagado",
  enviando = "enviando",
  finalizado = "finalizado"
}

const orderSchema = new mongoose.Schema(
  {
    user: { type: String, require: true, max: 100 },
    products: { type: Array, required: true },
    orderStatus: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const orderModel = mongoose.model(ordersCollection, orderSchema);

export { orderModel };
