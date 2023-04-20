import { Request, Response, NextFunction } from "express";
import { BlogModel } from "../models/BlogModel";
import IController from "./ControllerInterface";
import RemoveImage from "../utils/RemoveImage";

class BlogController implements IController {
  async index(req: Request, res: Response): Promise<void> {
    const currentPage: any = req.query.page || 1;
    const perPage: any = req.query.perPage || 5;

    let totalData: number;

    BlogModel.find()
      .countDocuments()
      .then((count) => {
        totalData = count;
        return BlogModel.find()
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
      })
      .then((result) => {
        res.status(200);
        res.json({
          msg: "index",
          data: result,   
          total_data: totalData,
          per_page: parseInt(perPage),
          current_page: parseInt(currentPage),
        });
      })
      .catch((err) => {
        res.json({ error: err });
      });
  }

  async create(req: Request, res: Response): Promise<any> {
    const { username, id } = req.app.locals.credential;
    const { caption } = req.body;

    const image: string = req.file?.filename || "default/gada";

    const postingan = await BlogModel.insertMany({
      username: username,
      caption: caption,
      image: image,
    });

    res.status(200);

    return res.json({
      msg: "create berhasil",
      data: postingan,
    });
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
    const { caption } = req.body;
    const image: string = req.file?.filename || "default/gada";

    const blog: any = await BlogModel.findById({
      _id: req.params.id,
    });

    if (!req.file) {
      await BlogModel.updateMany(
        { _id: req.params.id },
        {
          $set: {
            caption: blog.caption,
            image: blog.image,
          },
        }
      );
      return res.json({
        msg: "tidak ada yg diupdate",
      });
    } else {
      RemoveImage(blog.image);
      await BlogModel.updateMany(
        { _id: req.params.id },
        {
          $set: {
            caption: caption,
            image: image,
          },
        }
      );

      return res.json({
        msg: "data diupdate",
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const blog = await BlogModel.findById({
      _id: req.params.id,
    });

    if (!blog) {
      return res.json({
        msg: "tidak ada data",
      });
    } else {
      if (!blog.image) {
        await BlogModel.findByIdAndRemove({
          _id: req.params.id,
        });
        return res.json({
          msg: "data tanpa gambar dihapus",
        });
      } else {
        await BlogModel.findByIdAndRemove({
          _id: req.params.id,
        });
        RemoveImage(blog.image);
        return res.json({
          msg: "data dihapus",
        });
      }
    }
  }
}

export default new BlogController();
