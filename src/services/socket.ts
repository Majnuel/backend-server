import * as socketio from "socket.io";
import { getCartByUser } from "../api/carts";
import { getOrderByUser } from "../api/orders";
import { allProducts } from "../api/products";
import { sessionMiddleware } from "./server";

let io: any;

export const initWsServer = (server: any) => {
  io = new socketio.Server(server);

  // convert a connect middleware to a Socket.IO middleware
  const wrap = (middleware: any) => (socket: any, next: any) =>
    middleware(socket.request, {}, next);

  io.use(wrap(sessionMiddleware));

  io.on("connection", (socket: any) => {
    console.log(
      "socket connection established:",
      "SERVER SOCKET ID:",
      socket.id,
      "CLIENT SOCKET ID:",
      socket.client.id
    );

    socket.on("initiateChat", () => {});

    socket.on("newMessage", async (message: string) => {
      switch (message) {
        case "stock":
          const products = await allProducts();
          socket.emit("newReply", JSON.stringify(products));
          break;
        case "orden":
          if (!socket.request.session.passport?.user) {
            socket.emit(
              "newReply",
              "debes ingresar con tu usuario y contraseña para obtener esa información"
            );
          } else {
            console.log(socket.request.session.passport?.user);
            const orders = await getOrderByUser(
              socket.request.session.passport?.user
            );
            socket.emit("newReply", JSON.stringify(orders));
          }
          break;
        case "carrito":
          if (!socket.request.session.passport?.user) {
            socket.emit(
              "newReply",
              "debes ingresar con tu usuario y contraseña para obtener esa información"
            );
          } else {
            let cart = async (id: string) => {
              let myCart = await getCartByUser(id);
              return myCart;
            };
            cart(socket.request.session.passport.user).then((cart) => {
              console.log(cart);
              socket.emit("newReply", JSON.stringify(cart[0].products));
            });
          }

          break;
        default:
          socket.emit(
            "newReply",
            "Hola! No he podido comprender tu mensaje. Por favor ingresa una de las siguientes opciones \n\n - stock: para conocer nuestro stock actual \n - orden: para concer informacion de tu ultima orden \n - carrito: para conocer el estado actual de tu carrito"
          );
          break;
      }
    });
  });

  return io;
};
