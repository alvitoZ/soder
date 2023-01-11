import { Request, Response } from "express";
import PasswordHash from "../utils/PasswordHash";
// import UserModel from "../models/UserModel";
import { UserModel } from "../models/UserModel";

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    let { username, password } = req.body;

    const hashed: string = await PasswordHash.hash(password);

    const createdUsers = await UserModel.insertMany({
      username: username,
      password: hashed,
      password2: password,
    });

    // return res.send("register berhasil");
    return res.send("register berhasil" + createdUsers);
  };
  async login(req: Request, res: Response): Promise<Response> {
    //cari data user by username
    let { username, password } = req.body;
    const user: any = await UserModel.findOne({ username: username });

    // return res.send(user);

    //check password
    let compare = await PasswordHash.passwordComppare(password, user.password);
    // if (user) {
    // let compare = await PasswordHash.passwordComppare(
    // password,
    // user.password
    // );
    //   return res.send(compare);
    // } else {
    //   return res.send("user kagak ada");
    // }

    // generate token
    if (compare && user) {
      let token = PasswordHash.generate(user.id, user.username, user.password);
      return res.send({
        token: token,
      });
    } else {
      return res.send("auth failed");
    }

    // return res.send("login");
  }

  // profile(req: Request, res: Response): Response {
  //   return res.send(req.app.locals.credential);
  // }
  admin(req: Request, res: Response): Response {
    return res.send("login sebagai admin");
  }
  member(req: Request, res: Response): Response {
    return res.send("login sebagai member biasa");
  }
  guest(req: Request, res: Response): Response {
    return res.send("login sebagai guest");
  }
}

export default new AuthController();
