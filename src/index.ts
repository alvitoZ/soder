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
import multer, { Multer } from "multer";

import AuthRoutes from "./routers/AuthRoutes";
import BlogRoutes from "./routers/BlogRoutes";
import { Config } from "./config/Config";

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
    this.app.use("/images", express.static(path.join("images"))); //gambar
    // this.app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
    this.app.use(helmet({ contentSecurityPolicy: false }));
    this.app.use(
      multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
    );
  }

  protected routes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("dari ts");
    });

    this.app.use("/api/v1/auth", AuthRoutes); //login resgister
    this.app.use("/api/v1/blog", BlogRoutes); //user bikin postingan
    // this.app.use("/user/role", AdminRoutes); //admin / member / guest
  }
}

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const startServer = () => {
  const konek = new App().app;
  konek.listen(process.env.DB_PORT, () => {
    console.log(`http:localhost:${process.env.DB_PORT}`);
  });
};
