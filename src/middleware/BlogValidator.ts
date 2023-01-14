// import { Request, Response, NextFunction } from "express";
// import { check, validationResult } from "express-validator";
// import path from "path";
// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

//     cb(
//       null,
//       `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({ storage: storage });

// const extensiValidate = (path: string): string => {
//   // ${path.extname(extensiValidate(file.originalname))}
//   return (path = "jpg" || "png" || "webp" || "jpeg" || "gif");
// };

// const validateBlog = [
//   check("caption").isString(),
//   check("image").custom((value) => {
//     const minori = path.extname(extensiValidate(file.originalname));
//     if (minori) {
//       throw new Error("gunakan nama lain");
//     }
//     return true;
//   }),
//   (req: Request, res: Response, next: NextFunction) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(422);
//       return res.send({
//         errors: errors.array(),
//       });
//     } else {
//       next();
//     }
//   },
// ];

// export default validateBlog;
