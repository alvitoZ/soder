import { Router, Response, Request } from "express";
import IRouter from "./RouterInterface";
import AuthController from "../controller/AuthController";

class AuthRoutes implements IRouter {
  public router: Router;
  // public data = {};

  constructor() {
    this.router = Router();

    this.routes();
  }

  public routes(): void {
    this.router.post("/register", AuthController.register);
    this.router.post("/login", AuthController.login);
  }
}

export default new AuthRoutes().router;
