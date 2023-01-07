import { Request, Response, NextFunction } from "express";
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
    console.log("dari user controller index");
    return res.send(data);
  }
  create(req: Request, res: Response): Response {
    // return res.send(req.body);
    const { id, nama } = req.body;
    data.push({
      id: id,
      nama: nama,
    });
    console.log("dari user controller create");

    return res.send("data dibuat");
  }
  show(req: Request, res: Response): Response {
    let { id } = req.params;
    let orang = data.find((e) => e.id == id);
    return res.send(orang);
  }
  update(req: Request, res: Response): Response {
    let { id } = req.params;
    let { nama } = req.body;
    let orang = data.find((e) => e.id == id);
    orang.nama = nama;
    return res.send("data diupdate");
  }
  delete(req: Request, res: Response): Response {
    let { id } = req.params;
    let orang = data.filter((e) => e.id != id);
    return res.send(orang);
  }
}

export default new UserController();
