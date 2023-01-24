import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import cekNama from "../utils/IncludeSlash";

const validate = [
  check("username")
    .isLength({ min: 4 })
    .custom(async (value) => {
      const minori: boolean = cekNama(value);
      if (minori) {
        throw new Error("jgn pke /");
      }
      return true;
    }),
  check("password").isLength({ min: 6 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422);
      return res.send({
        errors: errors.array(),
      });
    } else {
      return next();
    }
  },
];

export default validate;
