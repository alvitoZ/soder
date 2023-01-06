import { Router, Response, Request } from "express";
import IRouter from "./RouterInterface";
import UserController from "../controller/UserController";

class UserRoutes implements IRouter {
  public router: Router;
  // public data = {};

  constructor() {
    this.router = Router();
    // this.data = {
    //   nama: "seele",
    //   age: 10,
    // };
    this.routes();
  }

  public routes(): void {
    this.router.get("/s", UserController.index);
    this.router.post("/s", UserController.create);
    this.router.get("/:id", UserController.show);
    this.router.put("/s:id", UserController.update);
    this.router.delete("/s:id", UserController.delete);
  }
  // public routes(): void {
  //   this.router.get("/s", (req: Request, res: Response) => {
  //     // res.send("dari user");
  //     res.json(this.data);
  //   });
  //   this.router.post("/s", (req: Request, res: Response) => {
  //     // const { nama, age } = this.data;

  //     // res.send({
  //     //   ...this.data,
  //     //   nama: req.body.nama,
  //     //   age: req.body.age,
  //     // });

  //     res.send(req.body);
  //     // res.send(nama);
  //   });
  // }
}

export default new UserRoutes().router;
