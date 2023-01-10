import { Request, Response } from "express";
import bcrypt from "bcrypt";
require("../utils/db");
import { UserModel } from "../models";

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    let { username, password } = req.body;
    const createdUser = await UserModel.insertMany({
      username: username,
      password: password,
    });

    return res.send("createdUser");
  };
  login(req: Request, res: Response): Response {
    return res.send(req.body);
    // return res.send("s");
  }
}

export default new AuthController();
