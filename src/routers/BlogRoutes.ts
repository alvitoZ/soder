import { Router, Response, Request } from "express";
import IRouter from "./RouterInterface";
import BlogController from "../controller/BlogController";
import { auth } from "../middleware/AuthMiddleware";
import { memberAuth } from "../middleware/MemberAuthValidator";

class BlogRoutes implements IRouter {
  public router: Router;

  constructor() {
    this.router = Router();

    this.routes();
  }

  public routes(): void {
    this.router.get("/", BlogController.index); //iwi
    this.router.get("/:id", BlogController.show);
    this.router.get("/:username", BlogController.user);
    this.router.post("/", auth, BlogController.create);
    this.router.put("/:id", auth, memberAuth, BlogController.update);
    this.router.delete("/:id", auth, memberAuth, BlogController.delete);
  }
}

export default new BlogRoutes().router;
