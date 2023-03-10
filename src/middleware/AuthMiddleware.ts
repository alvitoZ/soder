import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  let secretKey: string;
  let token: string;

  if (!req.headers.authorization) {
    res.status(401);
    return res.send("gada token authorization");
  } else {
    secretKey = process.env.JWT_SECRET_KEY || "undefined";
    token = req.headers.authorization.split(" ")[1];

    try {
      const credential: string | object = jwt.verify(token, secretKey);

      if (credential) {
        req.app.locals.credential = credential;
        return next();
      }
    } catch (error) {
      res.status(401);
      return res.send(error);
    }
  }
};
