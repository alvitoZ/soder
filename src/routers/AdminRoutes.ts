import { Router } from "express";
import AdminController from "../controller/AdminController";
import { auth } from "../middleware/AuthMiddleware";

class AdminRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  public routes() {
    this.router.get("/admin", auth, AdminController.admin);
    this.router.get("/member", auth, AdminController.member);
    this.router.get("/guest", AdminController.guest);
  }
}

export default new AdminRoutes().router;
