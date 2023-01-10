import { Router, Response, Request } from "express";
import IRouter from "./RouterInterface";
import UserController from "../controller/UserController";
import { auth } from "../middleware/AuthMiddleware";

class UserRoutes implements IRouter {
  public router: Router;

  constructor() {
    this.router = Router();

    this.routes();
  }

  public routes(): void {
    this.router.get("/", auth, UserController.index);
    this.router.get("/:id", UserController.show);
    this.router.post("/", UserController.create);
    this.router.put("/:id", UserController.update);
    this.router.delete("/:id", UserController.delete);
  }
}

export default new UserRoutes().router;
