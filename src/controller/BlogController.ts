import { Request, Response, NextFunction } from "express";
import { BlogModel } from "../models/BlogModel";
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
    return res.send("index" + data);
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
        const { caption, image } = req.body;
        // const { path } = req.file;

        const postingan = new BlogModel({
          username: username,
          caption: caption,
          image: req.file?.path,
        });

        await postingan.save();
        res.status(200);

        return res.send("create" + postingan);
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
