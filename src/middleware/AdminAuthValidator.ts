import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  const { Role } = req.app.locals.credential;
  if (Role == "admin") {
    return next();
  } else {
    return res.send("tidak punya izin akses");
  }
};
