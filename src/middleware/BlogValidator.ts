// import { Request, Response, NextFunction } from "express";
// import { check, validationResult } from "express-validator";

// const validate = [
//   check("caption").isLength({ min: 4 }),
//   (req: Request, res: Response, next: NextFunction) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(422);
//       return res.send({
//         errors: errors.array(),
//       });
//     } else {
//       return next();
//     }
//   },
// ];

// export default validate;
