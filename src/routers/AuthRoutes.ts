import { Router, Response, Request } from "express";
import IRouter from "./RouterInterface";
import AuthController from "../controller/AuthController";
import validate from "../middleware/AuthValidator";
import { auth } from "../middleware/AuthMiddleware";

class AuthRoutes implements IRouter {
  public router: Router;
  // public data = {};

  constructor() {
    this.router = Router();

    this.routes();
  }

  public routes(): void {
    this.router.post("/register", validate, AuthController.register);
    this.router.post("/login", validate, AuthController.login);
    // this.router.get("/profile", auth, AuthController.profile);
    this.router.get("/admin", auth, AuthController.admin);
    this.router.get("/member", auth, AuthController.member);
    this.router.get("/guest", AuthController.guest);
  }
}

export default new AuthRoutes().router;
