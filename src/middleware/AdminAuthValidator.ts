import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  const { Role } = req.app.locals.credential;
  if (Role == "admin") {
    return res.send("login sbg admin");
  } else {
    return res.send("error");
  }
};
