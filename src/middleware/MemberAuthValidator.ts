import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  const { Role, username } = req.app.locals.credential;
  // if(username == ){

  // }
  // if (Role == "member" && username == ) {
  if (Role == "member") {
    return next();
  } else {
    return res.send("error");
  }
};
