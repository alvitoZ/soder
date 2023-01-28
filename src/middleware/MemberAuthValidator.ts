import { Request, Response, NextFunction } from "express";

export const memberAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { role, username } = req.app.locals.credential;
  if (role == "admin") {
    return next();
  }

  if (username != req.body.username) {
    res.status(400);
    return res.json({
      msg: "tidak punya izin",
    });
  } else {
    return next();
  }
};
