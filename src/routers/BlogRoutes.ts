import { Router, Response, Request } from "express";
import IRouter from "./RouterInterface";
import BlogController from "../controller/BlogController";
import { auth } from "../middleware/AuthMiddleware";

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
    this.router.put("/:id", auth, BlogController.update);
    this.router.delete("/:id", auth, BlogController.delete);
  }
}

export default new BlogRoutes().router;
