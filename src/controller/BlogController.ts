import { Request, Response, NextFunction } from "express";
import { BlogModel } from "../models/BlogModel";
import { UserModel } from "../models/UserModel";
import IController from "./ControllerInterface";
import multer from "multer";
import upload from "../middleware/Upload";

class BlogController implements IController {
  async index(req: Request, res: Response): Promise<Response> {
    // const { username } = req.app.locals.credentials;

    // const data = await BlogModel.findOne({
    //   username: req.params.nama,
    // });

    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");

    const data = await BlogModel.find();
    // return res.send("index" + data);
    return res.json({
      msg: "index",
      data: data,
    });
  }

  async create(req: Request, res: Response): Promise<any> {
    upload.single("storage")(
      req,
      res,
      async function (err: any): Promise<Response> {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.log(err + "err1");
        } else if (err) {
          // An unknown error occurred when uploading.
          console.log(err + "err2");
        }
        console.log(req.file);

        // Everything went fine.

        const { username, id } = req.app.locals.credential;
        const { caption } = req.body;
        // const { path } = req.file;

        const postingan = await BlogModel.insertMany({
          username: username,
          caption: caption,
          image: req.file?.filename,
        });

        // await postingan.save();
        res.status(200);

        // return res.send("create" + postingan);
        return res.json({
          msg: "create berhasil",
          data: postingan,
        });
      }
    );
  }

  show(req: Request, res: Response): Response {
    return res.send("show");
  }

  update(req: Request, res: Response): Response {
    return res.send("update");
  }

  delete(req: Request, res: Response): Response {
    return res.send("delete");
  }
}

export default new BlogController();
