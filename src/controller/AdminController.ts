import { Request, Response } from "express";

class AdminController {
  admin(req: Request, res: Response): Response {
    const { role } = req.app.locals.credential;

    if (role == "admin") {
      res.status(200);
      return res.send({
        msg: "login sebagai admin",
        token: req.app.locals.credential,
      });
    } else {
      res.status(401);
      return res.send({
        msg: "role bukan admin/gagal login sebagai admin",
      });
    }
  }
  member(req: Request, res: Response): Response {
    const { role } = req.app.locals.credential;

    if (role == "member") {
      res.status(200);
      return res.send({
        msg: "login sebagai member biasa",
        token: req.app.locals.credential,
      });
    } else {
      res.status(401);
      return res.send({
        msg: "guest ama admin gaboleh",
        token: req.app.locals.credential,
      });
    }
  }
  guest(req: Request, res: Response): Response {
    res.status(200);
    return res.send("login sebagai guest");
  }
}

export default new AdminController();
