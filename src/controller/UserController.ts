import { Request, Response } from "express";
// import { ParamsDictionary } from "express-serve-static-core";
// import { ParsedQs } from "qs";
import IController from "./ControllerInterface";

let data: any[] = [
  {
    id: 1,
    nama: "seele",
  },
  {
    id: 2,
    nama: "seele2",
  },
  {
    id: 3,
    nama: "seele2",
  },
];

class UserController implements IController {
  index(req: Request, res: Response): Response {
    return res.send(data);
  }
  create(req: Request, res: Response): Response {
    // return res.send(req.body);
    const { id, nama } = req.body;
    data.push({
      id: id,
      nama: nama,
    });
    return res.send("data yg dibuat");
  }
  show(req: Request, res: Response): Response {
    let { id } = req.params;
    let test = data.find((e) => e.id == id);
    return res.send(test);
  }
  update(req: Request, res: Response): Response {
    throw new Error("Method not implemented.");
  }
  delete(req: Request, res: Response): Response {
    throw new Error("Method not implemented.");
  }
}

export default new UserController();
