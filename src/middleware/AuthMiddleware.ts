import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  let cobaAuth: boolean = true;
  if (cobaAuth) {
    console.log("dari middleware");

    next();
  } else {
    res.send(false);
  }
};
