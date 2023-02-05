import { Router, Response, Request } from "express";
import IRouter from "./RouterInterface";
import AuthController from "../controller/AuthController";
import validate from "../middleware/AuthValidator";

class AuthRoutes implements IRouter {
  public router: Router;

  constructor() {
    this.router = Router();

    this.routes();
  }

  public routes(): void {
    this.router.post("/register", validate, AuthController.register);
    this.router.post("/login", validate, AuthController.login);
  }
}

export default new AuthRoutes().router;
