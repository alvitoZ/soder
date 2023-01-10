// console.log("sassadddasa2");
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
// import { config as dotenv } from "dotenv";
import dotenv from "dotenv";

import UserRoutes from "./routers/UserRoutes";
import AuthRoutes from "./routers/AuthRoutes";

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
    this.app.use(cors());
  }

  protected routes(): void {
    // this.app.route("/").get((req: Request, res: Response) => {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("dari ts");
    });

    this.app.use("/api/v1/users", UserRoutes);
    this.app.use("/api/v1/auth", AuthRoutes);
  }
}

// const port: string | undefined = process.env.DB_PORT;
const konek = new App().app;
// const konek2 = new App();

// konek.routes;

konek.listen(process.env.DB_PORT, () => {
  console.log(`http:localhost:${process.env.DB_PORT}`);
});

// const app = express();

// app.get("/", (req, res) => {
//   res.send("hawo");
// });

// app.listen(5000, () => {
//   console.log("http://localhost:5000");
// });
