import express from "express";
const app = express();
import { mainRouter } from "../routes/mainRouter";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import { signUpFunc, loginFunc } from "./auth";
import { isLoggedIn } from "../middlewares/auth";
import helmet from "helmet";
import { StoreOptions } from "../config/mongo-store";
import * as http from "http";

export const myServer = http.createServer(app);

export const sessionMiddleware = session(StoreOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "pug");
app.set("views", "./views");

app.use(cookieParser());
app.use(sessionMiddleware);

// security middleware:
app.use(helmet());

//Indicamos que vamos a usar passport en todas nuestras rutas
app.use(passport.initialize());
//Permitimos que passport pueda manipular las sessiones de nuestra app
app.use(passport.session());
// loginFunc va a ser una funcion que vamos a crear y va a tener la logica de autenticacion
// Cuando un usuario se autentique correctamente, passport va a devolver en la session la info del usuario
passport.use("login", loginFunc);
//signUpFunc va a ser una funcion que vamos a crear y va a tener la logica de registro de nuevos usuarios
passport.use("signup", signUpFunc);

app.use("/api", mainRouter);

app.get("/", isLoggedIn, (req, res) => {
  res.render("main.pug");
});

app.use((req, res) => {
  res.status(404).json({
    msg: "Ruta no encontrada"
  });
});
