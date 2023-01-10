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

// const registerUser = async (req: Request, res: Response) => {
//   const { username, password, email } = req.body;

//   bcrypt.hash(password, 10, (hashError, hash) => {
//     if (hashError) {
//       return res.status(401).json({
//         message: hashError.message,
//         error: hashError,
//       });
//     }
//     res.json({
//       hash,
//     });

//     const _user = new UserModel({
//       _id: mongoose.Types.ObjectId,
//       email,
//       username,
//       password: hash,
//     });

//     console.log(_user);
//     return _user
//       .save()
//       .then((user) => {
//         return res.status(201).json({
//           user,
//         });
//       })
//       .catch((error) => {
//         return res.status(500).json({
//           message: error.message,
//           error,
//         });
//       });
//   });
// };
