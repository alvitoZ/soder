import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validate = [
  check("username").isString().isLength({ min: 4 }),
  check("password").isLength({ min: 6 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422);
      return res.send({
        errors: errors.array(),
      });
    } else {
      next();
    }
  },
];

export default validate;
