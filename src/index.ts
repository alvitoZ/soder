// console.log("sassadddasa2");
import express, { Application, Request, Response } from "express";
import UserRoutes from "./routers/UserRoutes";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugin();
    this.routes();
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

    this.app.use("/user", UserRoutes);
  }
}

const port: number = 5000;
const konek = new App().app;
// const konek2 = new App();

// konek.routes;

konek.listen(port, () => {
  console.log(`http:localhost:${port}`);
});

// const app = express();

// app.get("/", (req, res) => {
//   res.send("hawo");
// });

// app.listen(5000, () => {
//   console.log("http://localhost:5000");
// });
