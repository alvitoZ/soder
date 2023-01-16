// console.log("sassadddasa2");
import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
// import { config as dotenv } from "dotenv";
import dotenv, { config } from "dotenv";
import mongoose from "mongoose";
import path from "path";

import UserRoutes from "./routers/UserRoutes";
import AuthRoutes from "./routers/AuthRoutes";
import AdminRoutes from "./routers/AdminRoutes";
import BlogRoutes from "./routers/BlogRoutes";
import { Config } from "./config/Config";

// mongoose
//   .connect(String("mongodb://127.0.0.1:27017/test"))
//   .then(() => {
//     console.info("Mongo connected successfully.");
//     startServer();
//   })
//   .catch((e) => {
//     console.error(e);
//   });

mongoose.set("strictQuery", false);

mongoose
  .connect(Config.mongourl, {
    retryWrites: true,
  })
  .then(() => {
    console.log("Mongo connected successfully.");
    startServer();
  })
  .catch((error) => {
    console.log(error);
  });

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugin();
    this.routes();
    dotenv.config();
  }

  protected plugin(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan("dev"));
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use("/image", express.static(path.join("public"))); //gambar
    // this.app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
    this.app.use(helmet({ contentSecurityPolicy: false }));
  }

  protected routes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("dari ts");
    });

    this.app.use("/api/v1/users", UserRoutes); //crudx
    this.app.use("/api/v1/auth", AuthRoutes); //login resgister
    this.app.use("/api/v1/blog", BlogRoutes); //user bikin postingan
    this.app.use("/user/role", AdminRoutes); //admin / member / guest
  }
}

const startServer = () => {
  const konek = new App().app;
  konek.listen(process.env.DB_PORT, () => {
    console.log(`http:localhost:${process.env.DB_PORT}`);
  });
};

// startServer();
