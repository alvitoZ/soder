import e, { Request, Response, NextFunction } from "express";
import { BlogModel } from "../models/BlogModel";
import IController from "./ControllerInterface";
import multer from "multer";
import upload from "../middleware/Upload";
import RemoveImage from "../utils/RemoveImage";
import { any } from "bluebird";

class BlogController implements IController {
  async index(req: Request, res: Response): Promise<Response> {
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

        const postingan = await BlogModel.insertMany({
          username: username,
          caption: caption,
          image: req.file?.filename,
        });

        res.status(200);

        return res.json({
          msg: "create berhasil",
          data: postingan,
        });
      }
    );
  }

  async show(req: Request, res: Response): Promise<any> {
    // const username = req.params.username;
    const blog = await BlogModel.findById({ _id: req.params.id });

    if (blog) {
      return res.json({
        msg: "data ygb ditemukan",
        data: blog,
      });
    }
  }
  async user(req: Request, res: Response): Promise<any> {
    // const username = req.params.username;
    const blog = await BlogModel.find({ username: req.params.username });

    if (blog) {
      return res.json({
        msg: "data ygb ditemukan",
        data: blog,
      });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    upload.single("storage")(
      req,
      res,
      async function (err: any): Promise<Response> {
        if (err instanceof multer.MulterError) {
          console.log(err + "err1");
        } else if (err) {
          console.log(err + "err2");
        }
        console.log(req.file);

        // Everything went fine.

        const { caption } = req.body;
        const filename: string = req.file?.filename || "undefined";

        const blog: any = await BlogModel.findById({
          _id: req.params.id,
        });

        if (!req.file) {
          await BlogModel.updateMany(
            { _id: req.params.id },
            {
              $set: {
                caption: caption,
              },
            }
          );
          return res.json({
            msg: "data caption diupdate",
          });
        } else {
          if (!blog.image) {
            await BlogModel.updateMany(
              { _id: req.params.id },
              {
                $set: {
                  caption: caption,
                  image: filename,
                },
              }
            );
            return res.json({
              msg: "data diupdate",
            });
          } else {
            RemoveImage(blog.image);
            await BlogModel.updateMany(
              { _id: req.params.id },
              {
                $set: {
                  caption: caption,
                  image: filename,
                },
              }
            );
            return res.json({
              msg: "data diupdate",
            });
          }
        }
      }
    );
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const blog = await BlogModel.findById({
      _id: req.params.id,
    });

    if (!blog) {
      return res.json({
        msg: "ga nemu",
      });
    } else {
      if (!blog.image) {
        await BlogModel.findByIdAndRemove({
          _id: req.params.id,
        });
        return res.json({
          msg: "nemu nih tpi gada gambarny",
          data: blog,
        });
      } else {
        await BlogModel.findByIdAndRemove({
          _id: req.params.id,
        });
        RemoveImage(blog.image);
        return res.json({
          msg: "nemu nih gw hapus aja",
          data: blog,
        });
      }
    }
  }
}

export default new BlogController();
