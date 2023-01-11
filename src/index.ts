// console.log("sassadddasa2");
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
// import { config as dotenv } from "dotenv";
import dotenv, { config } from "dotenv";
import mongoose from "mongoose";

import UserRoutes from "./routers/UserRoutes";
import AuthRoutes from "./routers/AuthRoutes";
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
    this.app.use(helmet());
    this.app.use(
      cors({ credentials: true, origin: String(process.env.ORIGIN) })
    );
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  protected routes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("dari ts");
    });

    this.app.use("/api/v1/users", UserRoutes);
    this.app.use("/api/v1/auth", AuthRoutes);
  }
}

const startServer = () => {
  const konek = new App().app;
  konek.listen(process.env.DB_PORT, () => {
    console.log(`http:localhost:${process.env.DB_PORT}`);
  });
};

// startServer();
