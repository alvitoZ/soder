import { Request, Response, NextFunction } from "express";
import PasswordHash from "../utils/PasswordHash";
// import UserModel from "../models/UserModel";
import { Role } from "../roles/roles";
import { UserModel } from "../models/UserModel";

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    let { username, password } = req.body;
    const userName: any = await UserModel.findOne({ username: username });

    //  checkUser
    if (userName) {
      res.status(400);
      return res.json({
        msg: "user failed/nama udah ada yg make",
      });
    }

    const hashed: string = await PasswordHash.hash(password);

    const user = await UserModel.insertMany({
      username: username,
      password: hashed,
      password2: password,
      role: Role.Member,
    });

    res.status(200);
    return res.json({
      msg: "register berhasil",
      data: user,
    });
  };
  async login(req: Request, res: Response): Promise<any> {
    //cari data user by username
    let { username, password } = req.body;
    const user: any = await UserModel.findOne({ username: username });

    //  checkUser
    if (!user) {
      res.status(400);
      return res.send("user failed");
    }

    //check password
    let compare: boolean = await PasswordHash.passwordComppare(
      password,
      user.password
    );

    // generate token
    if (compare) {
      let token = PasswordHash.generate(
        user.id,
        user.username,
        user.password,
        user.role
      );
      res.status(200);
      return res.json({
        msg: "login berhasil",
        token: token,
      });
    } else {
      res.status(400);
      return res.send("auth failed");
    }
  }
}

export default new AuthController();
